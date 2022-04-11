import { PixKeyDto } from './../../dto/pix-key.dto';
import {
  Controller,
  Get,
  Param,
  Post,
  ParseUUIDPipe,
  Body,
  ValidationPipe,
  Inject,
  InternalServerErrorException,
  UnprocessableEntityException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from 'src/models/bank-account.model';
import { PixKey } from 'src/models/pix-key.model';
import { Repository } from 'typeorm';
import { ClientGrpc } from '@nestjs/microservices';
import { PixService } from 'src/grpc-types/pix-service.grpc';
import { Query } from '@nestjs/common';
import { PixKeyExistsDto } from 'src/dto/pix-key-exists.dto';

@Controller('bank-accounts/:bankAccountId/pix-keys')
export class PixKeyController {
  constructor(
    @InjectRepository(PixKey)
    private pixKeyRepo: Repository<PixKey>,
    @InjectRepository(BankAccount)
    private bankAccountRepo: Repository<BankAccount>,
    @Inject('CODEPIX_PACKAGE')
    private client: ClientGrpc,
  ) {}

  @Get()
  index(
    @Param('bankAccountId', new ParseUUIDPipe({ version: '4' }))
    bankAccountId: string,
  ) {
    return this.pixKeyRepo.find({
      where: {
        bank_account_id: bankAccountId,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  @Post()
  async create(
    @Param('bankAccountId', new ParseUUIDPipe({ version: '4' }))
    bankAccountId: string,
    @Body(new ValidationPipe({ errorHttpStatusCode: 422 }))
    body: PixKeyDto,
  ) {
    await this.bankAccountRepo.findOneOrFail(bankAccountId);

    const pixService: PixService = this.client.getService('PixService');

    const notFound = await this.checkPixKeyNotFound(body);

    if (!notFound) {
      throw new UnprocessableEntityException('PixKey already exists');
    }

    const createdPixKey = await pixService
      .registerPixKey({
        ...body,
        accountId: bankAccountId,
      })
      .toPromise();

    if (createdPixKey.error) {
      throw new InternalServerErrorException('Server not available');
    }

    const pixKey = this.pixKeyRepo.create({
      id: createdPixKey.id,
      bank_account_id: bankAccountId,
      ...body,
    });

    return await this.pixKeyRepo.save(pixKey);
  }

  async checkPixKeyNotFound(params: { key: string; kind: string }) {
    const pixService: PixService = this.client.getService('PixService');

    try {
      await pixService.find(params).toPromise();
      return false;
    } catch (err) {
      if (err.details == 'no key was found') {
        return true;
      }

      throw new InternalServerErrorException('Server not available');
    }
  }

  @Get('exists')
  @HttpCode(204)
  async exists(
    @Query(new ValidationPipe({ errorHttpStatusCode: 422 }))
    params: PixKeyExistsDto,
  ) {
    const pixService: PixService = this.client.getService('PixService');

    try {
      await pixService.find(params).toPromise();
    } catch (err) {
      if (err.details == 'no key was found') {
        throw new NotFoundException(err.details);
      }

      throw new InternalServerErrorException('Server not available');
    }
  }
}

import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { PixKeyKind } from 'src/models/pix-key.model';

export class TransactionDTO {
  @IsString()
  @IsNotEmpty()
  pix_key_key: string;

  @IsString()
  @IsIn(Object.values(PixKeyKind))
  @IsNotEmpty()
  pix_key_kind: PixKeyKind;

  @IsString()
  @IsOptional()
  description: string = null;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  readonly amount: number;
}

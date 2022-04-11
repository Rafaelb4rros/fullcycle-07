import { Command, Console } from 'nestjs-console';
import { getConnection } from 'typeorm';

@Console()
export class FixturesCommands {
  @Command({
    command: 'fixtures',
    description: 'seed database',
  })
  async command() {
    await this.runMigrations();

    const fixtures = (await import(`./fixtures/bank-${process.env.BANK_CODE}`))
      .default;

    for (const fixture of fixtures) {
      await this.createInDatabase(fixture.model, fixture.fields);
    }

    console.log('Database seeded');
  }

  async createInDatabase(model: any, data: any) {
    const repo = this.getRepository(model);
    const obj = repo.create(data);
    await repo.save(obj);
  }

  getRepository(model: any) {
    const conn = getConnection('default');
    return conn.getRepository(model);
  }

  async runMigrations() {
    const conn = getConnection('default');
    for (const _ of conn.migrations.reverse()) {
      await conn.undoLastMigration();
    }
  }
}

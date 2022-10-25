import { Injectable } from '@nestjs/common';
import { Command } from "nestjs-command";
import { DatabaseSeedService } from "./seed.service";

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: DatabaseSeedService) {}

  //npx nestjs-command seed:database
  @Command({
    command: 'seed:database',
    describe: 'seed the database',
  })
  async seed() {
    console.log('🌱 Start seeding');
    const r = await this.seedService.addRooms();
    console.log(r);
    console.log('🌱 Seeding done 🏁');
  }

  //npx nestjs-command seed:reset
  @Command({
    command: 'seed:reset',
    describe: 'delete all data from the database',
  })
  async delete() {
    console.log('🌱 Start deleting');
    await this.seedService.deleteAllRooms();
    console.log('🌱 Deleting done 🏁');
  }
}

import { Injectable } from '@nestjs/common'
import { Command } from 'nestjs-command'
import { DatabaseSeedService } from './seed.service'

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: DatabaseSeedService) {}

  //npx nestjs-command seed:database
  @Command({
    command: 'seed:database',
    describe: 'seed the database',
  })
  async seed() {
    console.log('🌱 Start seeding')
    await Promise.all([
      this.seedService.addRooms(),
      this.seedService.addServices(),
      this.seedService.addPrices(),
      this.seedService.addUsers(),
    ])
    console.log('🌱 Seeding done 🏁')
  }

  //npx nestjs-command seed:database:rooms
  @Command({
    command: 'seed:database:rooms',
    describe: 'seed room data to the database',
  })
  async seedRooms() {
    console.log('🌱 Start seeding')
    const r = await this.seedService.addRooms()
    console.log(r)
    console.log('🌱 Seeding done 🏁')
  }

  //npx nestjs-command seed:database:services
  @Command({
    command: 'seed:database:services',
    describe: 'seed service data to the database',
  })
  async seedServices() {
    console.log('🌱 Start seeding')
    const s = await this.seedService.addServices()
    console.log(s)
    console.log('🌱 Seeding done 🏁')
  }

  //npx nestjs-command seed:database:prices
  @Command({
    command: 'seed:database:prices',
    describe: 'seed price data to the database',
  })
  async seedPrices() {
    console.log('🌱 Start seeding')
    const p = await this.seedService.addPrices()
    console.log(p)
    console.log('🌱 seeding done 🏁')
  }

  //npx nestjs-command seed:database:users
  @Command({
    command: 'seed:database:users',
    describe: 'seed user data to the database',
  })
  async seedUsers() {
    console.log('🌱 Start seeding')
    const u = await this.seedService.addUsers()
    console.log(u)
    console.log('🌱 seeding done 🏁')
  }

  //npx nestjs-command seed:reset
  @Command({
    command: 'seed:reset',
    describe: 'delete all data from the database',
  })
  async delete() {
    console.log('🌱 Start deleting')
    await Promise.all([
      this.seedService.deleteAllRooms(),
      this.seedService.deleteAllServices(),
      this.seedService.deletePrices(),
      this.seedService.deleteUsers(),
    ])
    console.log('🌱 Deleting done 🏁')
  }
}

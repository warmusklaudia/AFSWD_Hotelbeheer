import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommandModule } from 'nestjs-command'
import { Room } from 'src/rooms/entities/room.entity'
import { Service } from 'src/services/entities/service.entity'

import { DatabaseSeedCommand } from './seed.command'
import { DatabaseSeedService } from './seed.service'

@Module({
  imports: [TypeOrmModule.forFeature([Room, Service]), CommandModule],
  providers: [DatabaseSeedCommand, DatabaseSeedService],
})
export class DatabaseSeedModule {}

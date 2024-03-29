import { Module } from '@nestjs/common'
import { CleaningService } from './cleaning.service'
import { CleaningResolver } from './cleaning.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cleaning } from './entities/cleaning.entity'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'

@Module({
  imports: [TypeOrmModule.forFeature([Cleaning, User])],
  providers: [CleaningResolver, CleaningService, UsersService],
})
export class CleaningModule {}

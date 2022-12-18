import { Module } from '@nestjs/common'
import { RoomsService } from './rooms.service'
import { RoomsResolver } from './rooms.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Room } from './entities/room.entity'
import { Reservation } from '../reservations/entities/reservation.entity'
import { ReservationsService } from '../reservations/reservations.service'
import { UsersService } from '../users/users.service'
import { User } from '../users/entities/user.entity'
import { Cleaning } from '../cleaning/entities/cleaning.entity'
import { CleaningService } from '../cleaning/cleaning.service'

@Module({
  imports: [TypeOrmModule.forFeature([Room, Reservation, User, Cleaning])],
  providers: [
    RoomsResolver,
    RoomsService,
    ReservationsService,
    UsersService,
    CleaningService,
  ],
})
export class RoomsModule {}

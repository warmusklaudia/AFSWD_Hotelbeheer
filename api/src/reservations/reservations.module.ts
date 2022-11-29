import { Module } from '@nestjs/common'
import { ReservationsService } from './reservations.service'
import { ReservationsResolver } from './reservations.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Reservation } from './entities/reservation.entity'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/entities/user.entity'
import { Room } from 'src/rooms/entities/room.entity'
import { RoomsService } from 'src/rooms/rooms.service'
import { Cleaning } from 'src/cleaning/entities/cleaning.entity'
import { CleaningService } from 'src/cleaning/cleaning.service'

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User, Room, Cleaning])],
  providers: [
    ReservationsResolver,
    ReservationsService,
    UsersService,
    RoomsService,
    CleaningService,
  ],
})
export class ReservationsModule {}

import { Module } from '@nestjs/common'
import { RoomsService } from './rooms.service'
import { RoomsResolver } from './rooms.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Room } from './entities/room.entity'
import { Reservation } from 'src/reservations/entities/reservation.entity'
import { ReservationsService } from 'src/reservations/reservations.service'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/entities/user.entity'
import { Cleaning } from 'src/cleaning/entities/cleaning.entity'
import { CleaningService } from 'src/cleaning/cleaning.service'

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

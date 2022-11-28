import { Module } from '@nestjs/common'
import { RoomsService } from './rooms.service'
import { RoomsResolver } from './rooms.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Room } from './entities/room.entity'
import { Reservation } from 'src/reservations/entities/reservation.entity'
import { ReservationsService } from 'src/reservations/reservations.service'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Room, Reservation, User])],
  providers: [RoomsResolver, RoomsService, ReservationsService, UsersService],
})
export class RoomsModule {}

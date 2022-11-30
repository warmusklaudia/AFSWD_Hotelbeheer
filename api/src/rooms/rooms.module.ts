import { Module } from '@nestjs/common'
import { RoomsService } from './rooms.service'
import { RoomsResolver } from './rooms.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Room } from './entities/room.entity'
import { Reservation } from '../reservations/entities/reservation.entity'
import { ReservationsService } from '../reservations/reservations.service'

@Module({
  imports: [TypeOrmModule.forFeature([Room, Reservation])],
  providers: [RoomsResolver, RoomsService, ReservationsService],
})
export class RoomsModule {}

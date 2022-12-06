import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CleaningService } from 'src/cleaning/cleaning.service'
import { Cleaning } from 'src/cleaning/entities/cleaning.entity'
import { Reservation } from 'src/reservations/entities/reservation.entity'
import { ReservationsService } from 'src/reservations/reservations.service'
import { NotificationsGateway } from './notifications.gateway'

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Cleaning])],
  providers: [NotificationsGateway, ReservationsService, CleaningService],
  exports: [NotificationsGateway],
})
export class NotificationsModule {}

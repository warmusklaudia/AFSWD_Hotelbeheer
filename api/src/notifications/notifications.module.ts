import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CleaningService } from 'src/cleaning/cleaning.service'
import { Cleaning } from 'src/cleaning/entities/cleaning.entity'
import { RequestedService } from 'src/requested-services/entities/requested-service.entity'
import { RequestedServicesService } from 'src/requested-services/requested-services.service'
import { Reservation } from 'src/reservations/entities/reservation.entity'
import { ReservationsService } from 'src/reservations/reservations.service'
import { NotificationsGateway } from './notifications.gateway'

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, Cleaning, RequestedService]),
  ],
  providers: [
    NotificationsGateway,
    ReservationsService,
    CleaningService,
    RequestedServicesService,
  ],
  exports: [NotificationsGateway],
})
export class NotificationsModule {}

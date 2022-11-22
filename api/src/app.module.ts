import { Module } from '@nestjs/common';
import { RoomsModule } from './rooms/rooms.module';
import { ReservationsModule } from './reservations/reservations.module';
import { UsersModule } from './users/users.module';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { DatabaseSeedModule } from "./seed/seed.module";
import { PricingModule } from './pricing/pricing.module';
import { ServicesModule } from './services/services.module';
import { RequestedServicesModule } from './requested-services/requested-services.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    BootstrapModule,
    RoomsModule,
    ReservationsModule,
    UsersModule,
    DatabaseSeedModule,
    ServicesModule,
    RequestedServicesModule,
    NotificationsModule,
    AuthModule,
    PricingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

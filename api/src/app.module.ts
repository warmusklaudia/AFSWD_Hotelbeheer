import { Module } from '@nestjs/common'
import { RoomsModule } from './rooms/rooms.module'
import { ReservationsModule } from './reservations/reservations.module'
import { UsersModule } from './users/users.module'
import { BootstrapModule } from './bootstrap/bootstrap.module'
import { DatabaseSeedModule } from './seed/seed.module'
import { PricingModule } from './pricing/pricing.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    BootstrapModule,
    AuthModule,
    RoomsModule,
    ReservationsModule,
    UsersModule,
    DatabaseSeedModule,
    PricingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

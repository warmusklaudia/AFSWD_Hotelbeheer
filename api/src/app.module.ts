import { Module } from '@nestjs/common';
import { RoomsModule } from './rooms/rooms.module';
import { ReservationsModule } from './reservations/reservations.module';
import { UsersModule } from './users/users.module';
import { BootstrapModule } from './bootstrap/bootstrap.module';

@Module({
  imports: [BootstrapModule, RoomsModule, ReservationsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

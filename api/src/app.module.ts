import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module';
import { ReservationsModule } from './reservations/reservations.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [RoomsModule, ReservationsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

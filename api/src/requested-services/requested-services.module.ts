import { Module } from '@nestjs/common';
import { RequestedServicesService } from './requested-services.service';
import { RequestedServicesResolver } from './requested-services.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestedService } from './entities/requested-service.entity';
import { Service } from '../services/entities/service.entity';
import { ServicesService } from '../services/services.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestedService, Service, User]),
    NotificationsModule,
  ],
  providers: [
    RequestedServicesResolver,
    RequestedServicesService,
    ServicesService,
    UsersService,
  ],
})
export class RequestedServicesModule {}

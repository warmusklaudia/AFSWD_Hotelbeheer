import { Module } from '@nestjs/common';
import { RequestedServicesService } from './requested-services.service';
import { RequestedServicesResolver } from './requested-services.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestedService } from './entities/requested-service.entity';
import { Service } from 'src/services/entities/service.entity';
import { ServicesService } from 'src/services/services.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { NotificationsModule } from 'src/notifications/notifications.module';

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

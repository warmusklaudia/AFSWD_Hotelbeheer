import { Module } from '@nestjs/common';
import { RequestedServicesService } from './requested-services.service';
import { RequestedServicesResolver } from './requested-services.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestedService } from './entities/requested-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestedService])],
  providers: [RequestedServicesResolver, RequestedServicesService],
})
export class RequestedServicesModule {}

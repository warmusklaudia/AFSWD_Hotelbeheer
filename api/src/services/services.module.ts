import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesResolver } from './services.resolver';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Service } from "./entities/service.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  providers: [ServicesResolver, ServicesService]
})
export class ServicesModule {}

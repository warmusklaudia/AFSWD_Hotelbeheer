import { Module } from '@nestjs/common'
import { PricingService } from './pricing.service'
import { PricingResolver } from './pricing.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Pricing } from './entities/pricing.entity'
import { User } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'

@Module({
  imports: [TypeOrmModule.forFeature([Pricing, User])],
  providers: [PricingResolver, PricingService, UsersService],
})
export class PricingModule {}

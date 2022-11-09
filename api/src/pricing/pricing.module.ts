import { Module } from '@nestjs/common'
import { PricingService } from './pricing.service'
import { PricingResolver } from './pricing.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Pricing } from './entities/pricing.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Pricing])],
  providers: [PricingResolver, PricingService],
})
export class PricingModule {}

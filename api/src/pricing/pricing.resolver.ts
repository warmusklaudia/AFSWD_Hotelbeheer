import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { PricingService } from './pricing.service'
import { Pricing } from './entities/pricing.entity'
import { CreatePricingInput } from './dto/create-pricing.input'
import { UpdatePricingInput } from './dto/update-pricing.input'

@Resolver(() => Pricing)
export class PricingResolver {
  constructor(private readonly pricingService: PricingService) {}

  @Mutation(() => Pricing)
  createPricing(
    @Args('createPricingInput') createPricingInput: CreatePricingInput,
  ): Promise<Pricing> {
    return this.pricingService.create(createPricingInput)
  }

  @Query(() => [Pricing], { name: 'prices' })
  findAll(): Promise<Pricing[]> {
    return this.pricingService.findAll()
  }

  @Query(() => Pricing, { name: 'price' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<Pricing> {
    return this.pricingService.findOne(id)
  }

  @Mutation(() => Pricing)
  updatePricing(
    @Args('updatePricingInput') updatePricingInput: UpdatePricingInput,
  ): Promise<Pricing> {
    return this.pricingService.update(updatePricingInput)
  }
}

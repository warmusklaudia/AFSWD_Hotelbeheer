import { CreatePricingInput } from './create-pricing.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdatePricingInput extends PartialType(CreatePricingInput) {
  @Field()
  rateId: string
}

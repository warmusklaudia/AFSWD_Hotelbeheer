import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreatePricingInput {
  @Field()
  rateName: string

  @Field()
  price: number
}

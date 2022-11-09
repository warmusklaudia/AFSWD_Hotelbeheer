import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreatePricingInput {
  @Field()
  reservationTime: string

  @Field()
  child: number

  @Field()
  adult: number

  @Field()
  night: number

  @Field()
  standard: number

  @Field()
  luxe: number

  @Field()
  breakfast: number
}

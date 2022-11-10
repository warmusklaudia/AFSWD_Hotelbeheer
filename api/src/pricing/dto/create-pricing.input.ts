import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreatePricingInput {
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

  @Field()
  childWeekend: number

  @Field()
  adultWeekend: number

  @Field()
  nightWeekend: number

  @Field()
  standardWeekend: number

  @Field()
  luxeWeekend: number

  @Field()
  breakfastWeekend: number
}

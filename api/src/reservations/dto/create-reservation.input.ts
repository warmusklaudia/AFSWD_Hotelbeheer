import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateReservationInput {
  @Field()
  userId: string

  @Field()
  amountAdults: number

  @Field()
  amountChildren: number

  @Field()
  breakfastAccess: boolean

  @Field()
  price: number

  @Field()
  reservationStartDate: Date

  @Field()
  reservationEndDate: Date
}

import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateReservationInput {
  @Field()
  userId: string;

  @Field({ defaultValue: 0 })
  rooms: number;

  @Field()
  amountAdults: number;

  @Field()
  amountChildren: number;

  @Field()
  price: number;

  @Field()
  reservationStartDate: Date;

  @Field()
  reservationEndDate: Date;
}

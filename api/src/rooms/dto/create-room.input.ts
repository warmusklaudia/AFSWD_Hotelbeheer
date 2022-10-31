import { InputType, Field } from '@nestjs/graphql';
import { Reservation } from 'src/reservations/entities/reservation.entity';

@InputType()
export class CreateRoomInput {
  @Field() // GraphQL
  name: string;

  @Field({ nullable: true }) // GraphQL
  description?: string;

  @Field() // GraphQL
  reservationId: string;

  @Field({ defaultValue: 0 }) // GraphQL
  rating: number;

  @Field() // GraphQL
  category: string;

  @Field() // GraphQL
  location: string;
}

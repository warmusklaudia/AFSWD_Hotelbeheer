import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoomInput {
  @Field() // GraphQL
  name: string;

  @Field({ nullable: true }) // GraphQL
  description?: string;

  @Field({ nullable: true }) // GraphQL
  reservationId: string;

  @Field({ defaultValue: 0 }) // GraphQL
  rating: number;

  @Field() // GraphQL
  category: string;

  @Field() // GraphQL
  location: string;

  @Field() // GraphQL
  accessCode: string;
}

import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  amountCredits: number;

  @Field()
  reservations: number;

  @Field()
  preferredLanguage: string;

  @Field()
  breakfastCode: string;
}

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  uid: string;

  // @Field()
  // preferredLanguage?: string;

  // @Field()
  // amountCredits?: number;

  // @Field()
  // reservations?: number;

  // @Field()
  // breakfastCode?: string;
}

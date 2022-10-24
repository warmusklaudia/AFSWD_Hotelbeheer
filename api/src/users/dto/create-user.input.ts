import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  uid: string;

  @Field()
  preferredLanguage: string;
}

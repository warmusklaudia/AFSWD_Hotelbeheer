import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateServiceInput {
  @Field()
  name: string;

  @Field()
  message: string;

  @Field()
  requestedDate: Date;
}

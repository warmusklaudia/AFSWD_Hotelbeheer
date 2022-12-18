import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateServiceInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;
}

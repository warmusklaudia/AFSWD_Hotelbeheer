import { CreateRequestedServiceInput } from './create-requested-service.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRequestedServiceInput extends PartialType(CreateRequestedServiceInput) {
  @Field(() => Int)
  id: number;
}

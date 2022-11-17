import { InputType, Field } from '@nestjs/graphql';
import { Service } from 'src/services/entities/service.entity';

@InputType()
export class CreateRequestedServiceInput {
  @Field()
  name: string;

  @Field()
  message: string;

  @Field()
  service: Service;

  @Field()
  requestedDate: Date;
}

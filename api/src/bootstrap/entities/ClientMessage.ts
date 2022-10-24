import { Field, ObjectType } from '@nestjs/graphql';

export enum MessageTypes {
  success = 'success',
  error = 'error',
  warning = 'warning',
}

@ObjectType()
export class ClientMessage {
  @Field()
  message: string;

  @Field()
  type: MessageTypes;

  @Field()
  statusCode: number;
}

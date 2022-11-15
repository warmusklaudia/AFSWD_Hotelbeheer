import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

@ObjectType()
export class Service {
  @Field(() => ID, { description: 'id of the service' })
  @ObjectIdColumn()
  id: ObjectId;

  @Field() // GraphQL
  @Column() //typeORM
  name: string;

  @Field() // GraphQL
  @Column() //typeORM
  message: string;

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}

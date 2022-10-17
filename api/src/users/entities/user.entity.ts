import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Column, ObjectIdColumn } from 'typeorm';

@ObjectType({ description: 'user' })
export class User {
  @Field(() => ID, { description: 'id of the user' })
  @ObjectIdColumn()
  id: ObjectId;

  @Field()
  @Column()
  amountCredits: number;

  @Field({ defaultValue: 0 })
  @Column()
  reservations: number;

  @Field()
  @Column()
  prefferedLanguage?: string;

  @Field()
  @Column()
  breakfastCode?: string;
}

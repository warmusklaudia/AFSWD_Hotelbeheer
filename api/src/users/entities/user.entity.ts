import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType({ description: 'user' })
export class User {
  @Field(() => ID, { description: 'id of the user' })
  @ObjectIdColumn()
  id: ObjectId;

  @Field()
  @Column()
  uid: string;

  @Field({ defaultValue: 0 })
  @Column()
  amountCredits: number;

  @Field({ defaultValue: 0 })
  @Column()
  reservations: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  preferredLanguage?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  breakfastCode?: string;

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}

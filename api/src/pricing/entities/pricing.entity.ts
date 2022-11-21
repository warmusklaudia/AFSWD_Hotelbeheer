import { Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
@ObjectType({ description: 'pricing' })
export class Pricing {
  @Field(() => ID)
  @ObjectIdColumn({ name: '_id' })
  rateId: ObjectId

  @Field()
  @Column()
  rateName: string

  @Field()
  @Column()
  price: number

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}

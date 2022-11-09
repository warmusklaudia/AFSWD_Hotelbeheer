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
  id: ObjectId

  @Field()
  @Column()
  reservationTime: string

  @Field()
  @Column()
  child: number

  @Field()
  @Column()
  adult: number

  @Field()
  @Column()
  night: number

  @Field()
  @Column()
  standard: number

  @Field()
  @Column()
  luxe: number

  @Field()
  @Column()
  breakfast: number

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}

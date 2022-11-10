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

  @Field()
  @Column()
  childWeekend: number

  @Field()
  @Column()
  adultWeekend: number

  @Field()
  @Column()
  nightWeekend: number

  @Field()
  @Column()
  standardWeekend: number

  @Field()
  @Column()
  luxeWeekend: number

  @Field()
  @Column()
  breakfastWeekend: number

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}

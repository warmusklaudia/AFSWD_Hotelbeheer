import { ObjectType, Field, ID } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import { Service } from '../../services/entities/service.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Role } from './role.entity'

@Entity()
@ObjectType({ description: 'user' })
export class User {
  @Field(() => ID, { description: 'id of the user' })
  @ObjectIdColumn()
  id: ObjectId

  @Field()
  @Column()
  uid: string

  @Field({ nullable: true })
  @Column()
  firstName?: string

  @Field({ nullable: true })
  @Column()
  lastName?: string

  @Field({ defaultValue: 0 })
  @Column()
  amountCredits: number = 0

  @Field()
  @Column()
  reservations: number = 0

  @Field()
  @Column({ nullable: true })
  preferredLanguage?: string = ''

  @Field()
  @Column({ nullable: true })
  imgUrl?: string = ''

  @Field(() => [Service], { nullable: 'itemsAndList' })
  @Column({ nullable: true })
  requestedServices?: Service[]

  @Field(() => Role, { nullable: true })
  @Column({ default: { name: 'user' } })
  role?: Role = { name: 'user' }

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}

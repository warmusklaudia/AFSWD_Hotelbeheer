import { ObjectType, Field, ID } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import { Service } from '../../services/entities/service.entity'
import { User } from '../../users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
@ObjectType()
export class RequestedService {
  @Field(() => ID, { description: 'id of the requestedService' })
  @ObjectIdColumn()
  id: ObjectId

  @Field(() => Service)
  service: Service

  @Column()
  serviceId: string

  @Field(() => User)
  user: User

  @Column()
  userId: string

  @Field({ nullable: true }) // GraphQL
  @Column({ nullable: true }) //typeORM
  message: string

  @Field() // GraphQL
  @Column() //typeORM
  requestedDate: Date

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}

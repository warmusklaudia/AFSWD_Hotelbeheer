import { ObjectType, Field, ID } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import { Service } from 'src/services/entities/service.entity'
import { User } from 'src/users/entities/user.entity'
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  message: string

  @Field()
  @Column()
  requestedDate: Date

  @Field({ defaultValue: false })
  @Column()
  resolved: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  resolvedDate: Date

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}

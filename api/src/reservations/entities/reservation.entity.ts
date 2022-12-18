import { ObjectType, Field, ID } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import { Room } from '../../rooms/entities/room.entity'
import { User } from '../../users/entities/user.entity'
import { Cleaning } from '../../cleaning/entities/cleaning.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
@ObjectType({ description: 'reservation' })
export class Reservation {
  @Field(() => ID, { description: 'id of the reservation' })
  @ObjectIdColumn()
  id: ObjectId

  @Column()
  userId: string

  @Field(() => User)
  user: User

  @Field(() => [Room], { nullable: 'itemsAndList' }) // Can return []
  @Column({ nullable: true })
  rooms?: Room[]

  @Field()
  @Column({ default: 0 })
  amountRooms: number = 0

  @Field()
  @Column()
  amountAdults: number

  @Field()
  @Column()
  amountChildren: number

  @Field()
  @Column()
  price: number

  @Field()
  @Column()
  breakfastAccess: boolean

  @Field()
  @Column()
  reservationStartDate: Date

  @Field()
  @Column()
  reservationEndDate: Date

  @Column({ nullable: true })
  cleaningId: string

  @Field(() => Cleaning, { nullable: true })
  cleaning: Cleaning

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Room } from "src/rooms/entities/room.entity";
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Field({ defaultValue: 0 })
  @Column()
  amountRooms: number

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
  reservationStartDate: Date

  @Field()
  @Column()
  reservationEndDate: Date

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}

import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';
import { Reservation } from "src/reservations/entities/reservation.entity";

@Entity()
@ObjectType({ description: 'room' })
export class Room {
  @Field(() => ID, { description: 'id of the room' })
  @ObjectIdColumn({ name: '_id' })
  id: ObjectId;

  @Field() // GraphQL
  @Column() //typeORM
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Reservation)
  reservation: Reservation;

  @Column()
  reservationId: string;

  @Field()
  @Column()
  rating: number;

  @Field()
  @Column()
  category: string;

  @Field()
  @Column()
  roomsAvailable: number;

  @Field()
  @Column()
  cleaned?: boolean;

  @Field()
  @Column()
  occupied: boolean;

  @Field()
  @Column()
  roomAccesCode: string;

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}

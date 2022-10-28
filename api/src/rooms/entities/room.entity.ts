import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { ObjectId } from 'mongodb';

@Entity()
@ObjectType({ description: 'room' })
export class Room {
  @Field(() => ID, { description: 'id of the room' })
  @ObjectIdColumn()
  id: ObjectId;

  @Field() // GraphQL
  @Column() //typeORM
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Reservation, { nullable: true })
  reservation: Reservation;

  @Column({ nullable: true })
  reservationId: string;

  @Field()
  @Column()
  rating: number;

  @Field()
  @Column()
  category: string;

  @Field()
  @Column()
  Location: string;

  @Field()
  @Column()
  AccessCode: string;

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}

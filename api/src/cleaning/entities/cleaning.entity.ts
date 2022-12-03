import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ObjectId } from 'mongodb'
import { User } from 'src/users/entities/user.entity'

@Entity()
@ObjectType({ description: 'cleaning' })
export class Cleaning {
  @Field(() => ID)
  @ObjectIdColumn({ name: '_id' })
  cleaningId: ObjectId

  @Field({ defaultValue: false })
  @Column()
  changeTheLinens: boolean

  @Field({ defaultValue: false })
  @Column()
  clearTheTrash: boolean

  @Field({ defaultValue: false })
  @Column()
  disinfectSurfaces: boolean

  @Field({ defaultValue: false })
  @Column()
  cleanTheBathroom: boolean

  @Field({ defaultValue: false })
  @Column()
  vacuumTheFloor: boolean

  @Field({ defaultValue: false })
  @Column()
  mopTheFloor: boolean

  @Field({ defaultValue: false })
  @Column()
  finish: boolean

  @Field({ nullable: true })
  @Column()
  finishDate: Date

  @Column({ nullable: true })
  cleanedById: string

  @Field(() => User, { nullable: true })
  cleanedBy: User

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}

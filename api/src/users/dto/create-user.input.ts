import { InputType, Field } from '@nestjs/graphql'
import { Role } from '../entities/role.entity'

@InputType()
export class CreateUserInput {
  @Field()
  uid: string

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field({ nullable: true })
  preferredLanguage?: string

  @Field({ nullable: true })
  imgUrl?: string

  @Field({ nullable: true })
  role?: Role
}

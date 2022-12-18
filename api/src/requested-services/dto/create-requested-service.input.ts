import { InputType, Field } from '@nestjs/graphql'
import { Service } from 'src/services/entities/service.entity'

@InputType()
export class CreateRequestedServiceInput {
  @Field()
  message: string

  @Field()
  serviceId: string

  @Field()
  userId: string

  @Field()
  requestedDate: Date

  @Field({ nullable: true })
  resolvedDate: Date

  @Field({ defaultValue: false })
  resolved: boolean
}

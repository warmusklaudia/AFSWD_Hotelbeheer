import { CreateCleaningInput } from './create-cleaning.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateCleaningInput extends PartialType(CreateCleaningInput) {
  @Field()
  id: string
}

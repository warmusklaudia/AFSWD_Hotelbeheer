import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateCleaningInput {
  @Field({ defaultValue: false })
  changeTheLinens: boolean

  @Field({ defaultValue: false })
  clearTheTrash: boolean

  @Field({ defaultValue: false })
  disinfectSurfaces: boolean

  @Field({ defaultValue: false })
  cleanTheBathroom: boolean

  @Field({ defaultValue: false })
  vacuumTheFloor: boolean

  @Field({ defaultValue: false })
  mopTheFloor: boolean

  @Field({ defaultValue: false })
  finish: boolean

  @Field({ nullable: true })
  finishDate: Date

  @Field({ nullable: true })
  cleanedById: string
}

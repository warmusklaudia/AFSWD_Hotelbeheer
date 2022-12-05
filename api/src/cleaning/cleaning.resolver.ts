import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { CleaningService } from './cleaning.service'
import { Cleaning } from './entities/cleaning.entity'
import { CreateCleaningInput } from './dto/create-cleaning.input'
import { UpdateCleaningInput } from './dto/update-cleaning.input'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/entities/user.entity'
import { UseGuards } from '@nestjs/common'
import { FirebaseGuard } from 'src/auth/guard/firebase.guard'
import { RolesGuard } from 'src/auth/guard/role.guard'
import {
  ClientMessage,
  MessageTypes,
} from 'src/bootstrap/entities/ClientMessage'

@Resolver(() => Cleaning)
export class CleaningResolver {
  constructor(
    private readonly cleaningService: CleaningService,
    private readonly usersService: UsersService,
  ) {}

  @ResolveField()
  cleanedBy(@Parent() c: Cleaning): Promise<User> {
    return this.usersService.findOneByUid(c.cleanedById)
  }

  @UseGuards(FirebaseGuard, RolesGuard(['admin']))
  @Mutation(() => Cleaning)
  async createCleaning(
    @Args('createCleaningInput') createCleaningInput: CreateCleaningInput,
  ): Promise<Cleaning> {
    const res = await this.cleaningService.create(createCleaningInput)
    return res
  }

  @Query(() => [Cleaning], { name: 'cleaning' })
  findAll(): Promise<Cleaning[]> {
    return this.cleaningService.findAll()
  }

  @Query(() => Cleaning, { name: 'cleaning' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.cleaningService.findOne(id)
  }

  @UseGuards(FirebaseGuard, RolesGuard(['admin']))
  @Mutation(() => Cleaning)
  updateCleaning(
    @Args('updateCleaningInput') updateCleaningInput: UpdateCleaningInput,
  ) {
    return this.cleaningService.update(updateCleaningInput)
  }

  @UseGuards(FirebaseGuard, RolesGuard(['admin']))
  @Mutation(() => Cleaning)
  async removeCleaning(
    @Args('id', { type: () => String }) id: string,
  ): Promise<ClientMessage> {
    const deleted = await this.cleaningService.remove(id)
    if (deleted.affected <= 1)
      return {
        type: MessageTypes.success,
        message: 'Cleaning deleted',
        statusCode: 200,
      }
    return {
      type: MessageTypes.error,
      message: 'Could not delete cleaning',
      statusCode: 400,
    }
  }
}

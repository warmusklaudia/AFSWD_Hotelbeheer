import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import {
  ClientMessage,
  MessageTypes,
} from '../bootstrap/entities/ClientMessage'
import { FirebaseGuard } from '../auth/guard/firebase.guard'
import { RolesGuard } from '../auth/guard/role.guard'
import { UseGuards } from '@nestjs/common'
import { CurrentUser } from '../auth/decorators/user.decorator'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput)
  }

  @UseGuards(FirebaseGuard, RolesGuard(['admin']))
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll()
  }

  @UseGuards(FirebaseGuard)
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<User> {
    return this.usersService.findOne(id)
  }

  @UseGuards(FirebaseGuard)
  @Query(() => User)
  findByUid(@Args('uid', { type: () => String }) uid: string) {
    return this.usersService.findOneByUid(uid)
  }

  @UseGuards(FirebaseGuard)
  @Query(() => User)
  findByCurrentUserUid(@CurrentUser() user) {
    return this.usersService.findOneByUid(user.uid)
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput)
  }

  @Mutation(() => User, { name: 'addCreditsToUser' })
  addCreditsToUser(@Args('id') id: string, @Args('amount') amount: number) {
    return this.usersService.addCreditsToUser(id, amount)
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => User)
  async removeUser(
    @Args('id', { type: () => String }) id: string,
  ): Promise<ClientMessage> {
    const deleted = await this.usersService.remove(id)
    if (deleted.affected <= 1)
      return {
        type: MessageTypes.success,
        message: 'User deleted',
        statusCode: 200,
      }

    return {
      type: MessageTypes.error,
      message: 'Delete action went wrong.',
      statusCode: 400,
    }
  }
}

import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { ReservationsService } from './reservations.service'
import { Reservation } from './entities/reservation.entity'
import { CreateReservationInput } from './dto/create-reservation.input'
import { UpdateReservationInput } from './dto/update-reservation.input'
import {
  ClientMessage,
  MessageTypes,
} from '../bootstrap/entities/ClientMessage'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { FirebaseGuard } from '../auth/guard/firebase.guard'
import { UseGuards } from '@nestjs/common'
import { CleaningService } from '../cleaning/cleaning.service'
import { Cleaning } from '../cleaning/entities/cleaning.entity'

@Resolver(() => Reservation)
export class ReservationsResolver {
  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly usersService: UsersService,
    private readonly cleaningService: CleaningService,
  ) {}

  @ResolveField()
  user(@Parent() r: Reservation): Promise<User> {
    return this.usersService.findOneByUid(r.userId)
  }

  @ResolveField()
  cleaning(@Parent() r: Reservation): Promise<Cleaning> {
    //@ts-ignore
    return this.cleaningService.findOne(r.cleaningId)
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => Reservation)
  async createReservation(
    @Args('createReservationInput')
    createReservationInput: CreateReservationInput,
  ): Promise<Reservation> {
    const res = await this.reservationsService.create(createReservationInput)
    return res
  }

  @Query(() => [Reservation], { name: 'reservations' })
  findAll(): Promise<Reservation[]> {
    return this.reservationsService.findAll()
  }

  @Query(() => Reservation, { name: 'reservation' })
  findOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Reservation> {
    return this.reservationsService.findOne(id)
  }

  @Query(() => [Reservation])
  findReservationsByUserId(
    @Args('uid', { type: () => String }) uid: string,
  ): Promise<Reservation[]> {
    return this.reservationsService.findByUserId(uid)
  }

  @Query(() => [Reservation])
  findCleaningByReservationEndDate(): Promise<Reservation[]> {
    return this.reservationsService.findCleaningByReservationEndDate()
  }

  @Query(() => [Reservation])
  reservationsWithBreakfast(): Promise<Reservation[]> {
    return this.reservationsService.findReservationsWithBreakfastAccess()
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => Reservation)
  updateReservation(
    @Args('updateReservationInput')
    updateReservationInput: UpdateReservationInput,
  ) {
    return this.reservationsService.update(updateReservationInput)
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => Reservation)
  async removeReservation(
    @Args('id', { type: () => String }) id: string,
  ): Promise<ClientMessage> {
    const deleted = await this.reservationsService.remove(id)
    if (deleted.affected <= 1)
      return {
        type: MessageTypes.success,
        message: 'Reservation deleted',
        statusCode: 200,
      }

    return {
      type: MessageTypes.error,
      message: 'Delete action went wrong.',
      statusCode: 400,
    }
  }
}

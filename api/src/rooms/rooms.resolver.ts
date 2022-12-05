import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { RoomsService } from './rooms.service'
import { Room } from './entities/room.entity'
import { CreateRoomInput } from './dto/create-room.input'
import { UpdateRoomInput } from './dto/update-room.input'
import {
  ClientMessage,
  MessageTypes,
} from '../bootstrap/entities/ClientMessage'
import { RolesGuard } from '../auth/guard/role.guard'
import { FirebaseGuard } from '../auth/guard/firebase.guard'
import { UseGuards } from '@nestjs/common'
import { ReservationsService } from '../reservations/reservations.service'
import { Reservation } from '../reservations/entities/reservation.entity'

@Resolver(() => Room)
export class RoomsResolver {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly reservationsService: ReservationsService,
  ) {}

  @ResolveField(() => Reservation)
  reservation(@Parent() r: Room): Promise<Reservation> {
    return this.reservationsService.findOne(r.reservationId)
  }

  @Mutation(() => Room)
  createRoom(
    @Args('createRoomInput') createRoomInput: CreateRoomInput,
  ): Promise<Room> {
    return this.roomsService.create(createRoomInput)
  }

  @Query(() => [Room], { name: 'rooms' })
  findAll(): Promise<Room[]> {
    return this.roomsService.findAll()
  }

  @Query(() => [Room], { name: 'roomsWithoutReservation' })
  findRoomsWithoutReservation(): Promise<Room[]> {
    return this.roomsService.findRoomsWithoutReservation()
  }

  @Query(() => [Room], { name: 'roomsWithReservation' })
  findRoomsWithReservation(): Promise<Room[]> {
    return this.roomsService.findRoomsWithReservation()
  }

  @Query(() => Room, { name: 'room' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<Room> {
    return this.roomsService.findOne(id)
  }

  @Query(() => [Room], { name: 'roomsByNameCat' })
  findByName(
    @Args('searchRoomByName') name: string,
    @Args('searchRoomByCat') category: string,
  ): Promise<Room[]> {
    return this.roomsService.findByString(name, category)
  }

  @UseGuards(FirebaseGuard, RolesGuard(['admin']))
  @Mutation(() => Room)
  updateRoom(
    @Args('updateRoomInput') updateRoomInput: UpdateRoomInput,
  ): Promise<Room> {
    return this.roomsService.update(updateRoomInput)
  }

  @Mutation(() => Room, { name: 'removeReservationFromRoom' })
  async removeReservationFromRoom(
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.roomsService.removeReservationFromRoom(id)
  }

  @Mutation(() => Room)
  async addReservationToRoom(
    @Args('id') id: string,
    @Args('reservationId') reservationId: string,
  ): Promise<Room> {
    return this.roomsService.addReservationToRoom(id, reservationId)
  }

  @UseGuards(FirebaseGuard, RolesGuard(['admin']))
  @Mutation(() => ClientMessage)
  async removeRoom(
    @Args('id', { type: () => String }) id: string,
  ): Promise<ClientMessage> {
    const deleted = await this.roomsService.remove(id)
    if (deleted.affected <= 1)
      return {
        type: MessageTypes.success,
        message: 'Room deleted',
        statusCode: 200,
        id: id,
      }

    return {
      type: MessageTypes.error,
      message: 'Delete action went wrong.',
      statusCode: 400,
    }
  }
}

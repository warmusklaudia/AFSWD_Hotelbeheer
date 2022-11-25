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
} from 'src/bootstrap/entities/ClientMessage'

@Resolver(() => Room)
export class RoomsResolver {
  constructor(
    private readonly roomsService: RoomsService,
  ) {}

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

  @Mutation(() => Room)
  async removeRoom(
    @Args('id', { type: () => String }) id: string,
  ): Promise<ClientMessage> {
    const deleted = await this.roomsService.remove(id)
    if (deleted.affected <= 1)
      return {
        type: MessageTypes.success,
        message: 'Room deleted',
        statusCode: 200,
      }

    return {
      type: MessageTypes.error,
      message: 'Delete action went wrong.',
      statusCode: 400,
    }
  }
}

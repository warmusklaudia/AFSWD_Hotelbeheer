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
import { Reservation } from 'src/reservations/entities/reservation.entity'
import { ReservationsService } from 'src/reservations/reservations.service'
import { RolesGuard } from 'src/auth/guard/role.guard'
import { FirebaseGuard } from 'src/auth/guard/firebase.guard'
import { UseGuards } from '@nestjs/common'

@Resolver(() => Room)
export class RoomsResolver {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly reservationsService: ReservationsService,
  ) {}

  @ResolveField()
  reservation(@Parent() r: Room): Promise<Reservation> {
    return this.reservationsService.findOne(r.reservationId)
  }

  @UseGuards(FirebaseGuard, RolesGuard(['admin']))
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
    //@ts-ignore
    return this.roomsService.update(updateRoomInput)
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

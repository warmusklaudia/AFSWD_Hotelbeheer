import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import {
  ClientMessage,
  MessageTypes,
} from 'src/bootstrap/entities/ClientMessage';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { ReservationsService } from 'src/reservations/reservations.service';

@Resolver(() => Room)
export class RoomsResolver {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly reservationsService: ReservationsService,
  ) {}

  @ResolveField()
  reservation(@Parent() r: Room): Promise<Reservation> {
    return this.reservationsService.findOne(r.reservationId);
  }

  @Mutation(() => Room)
  createRoom(
    @Args('createRoomInput') createRoomInput: CreateRoomInput,
  ): Promise<Room> {
    return this.roomsService.create(createRoomInput);
  }

  @Query(() => [Room], { name: 'rooms' })
  findAll(): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Query(() => Room, { name: 'room' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<Room> {
    return this.roomsService.findOne(id);
  }

  @Query(() => [Room], { name: 'roomsByName' })
  findByName(@Args('searchRoomByName') name: string): Promise<Room[]> {
    return this.roomsService.findByName(name);
  }

  @Mutation(() => Room)
  updateRoom(
    @Args('updateRoomInput') updateRoomInput: UpdateRoomInput,
  ): Promise<Room> {
    return this.roomsService.update(updateRoomInput);
  }

  @Mutation(() => Room)
  async removeRoom(
    @Args('id', { type: () => String }) id: string,
  ): Promise<ClientMessage> {
    const deleted = await this.roomsService.remove(id);
    if (deleted.affected <= 1)
      return {
        type: MessageTypes.success,
        message: 'Room deleted',
        statusCode: 200,
      };

    return {
      type: MessageTypes.error,
      message: 'Delete action went wrong.',
      statusCode: 400,
    };
  }
}

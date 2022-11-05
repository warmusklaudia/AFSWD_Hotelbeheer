import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { ReservationsService } from 'src/reservations/reservations.service';
import { DeleteResult, Repository } from 'typeorm';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
    private readonly reservationsService: ReservationsService,
  ) {}

  create(createRoomInput: CreateRoomInput): Promise<Room> {
    const r = new Room();

    r.name = createRoomInput.name;
    r.description = createRoomInput.description;
    r.category = createRoomInput.category;
    r.rating = createRoomInput.rating;
    r.reservationId = createRoomInput.reservationId;

    return this.roomsRepository.save(r);
  }

  findAll(): Promise<Room[]> {
    return this.roomsRepository.find();
  }

  findOne(id: string): Promise<Room> {
    //@ts-ignore
    return this.roomsRepository.findOne(new ObjectId(id));
  }

  async update(updateRoomInput: UpdateRoomInput) {
    //@ts-ignore
    const update = await this.roomsRepository.findOne(updateRoomInput.id);

    update.name = updateRoomInput.name;
    update.description = updateRoomInput.description;
    update.category = updateRoomInput.category;
    update.rating = updateRoomInput.rating;
    update.reservationId = updateRoomInput.reservationId;

    if (updateRoomInput.reservationId) {
      this.reservationsService.incrementRooms(updateRoomInput.reservationId);
    }

    return this.roomsRepository.save(update);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.roomsRepository.delete(id);
  }
}

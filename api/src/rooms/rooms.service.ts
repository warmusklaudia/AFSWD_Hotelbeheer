import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { DeleteResult, Repository } from 'typeorm';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
  ) {}

  create(createRoomInput: CreateRoomInput): Promise<Room> {
    const r = new Room();

    r.name = createRoomInput.name;
    r.description = createRoomInput.description;
    r.category = createRoomInput.category;
    r.rating = createRoomInput.rating;
    r.reservationId = createRoomInput.reservationId;
    r.location = createRoomInput.location;
    r.accessCode = createRoomInput.accessCode;

    return this.roomsRepository.save(r);
  }

  findAll(): Promise<Room[]> {
    return this.roomsRepository.find();
  }

  findOne(id: string): Promise<Room> {
    //@ts-ignore
    return this.roomsRepository.findOne(new ObjectId(id));
  }

  findByString(searchName: string, searchCategory: string): Promise<Room[]> {
    return this.roomsRepository.find({
      //@ts-ignore
      name: { $regex: searchName, $options: 'i' },
      category: { $regex: searchCategory, $options: 'i' },
    });
  }

  async update(updateRoomInput: UpdateRoomInput) {
    const update = await this.roomsRepository.findOne(
      //@ts-ignore
      new ObjectId(updateRoomInput.id),
    );
    update.name = updateRoomInput.name;
    update.description = updateRoomInput.description;
    update.category = updateRoomInput.category;
    update.rating = updateRoomInput.rating;
    update.reservationId = updateRoomInput.reservationId;
    update.location = updateRoomInput.location;
    update.accessCode = updateRoomInput.accessCode;

    await this.roomsRepository.save(update);
    //@ts-ignore
    return this.roomsRepository.findOne(new ObjectId(updateRoomInput.id));
  }

  remove(id: string): Promise<DeleteResult> {
    return this.roomsRepository.delete(id);
  }
}

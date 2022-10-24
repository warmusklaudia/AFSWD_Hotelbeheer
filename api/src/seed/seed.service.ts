import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as jsonRoomsSeed from './data/rooms.json'; //tsconfig "resolveJsonModule": true,
import { Room } from 'src/rooms/entities/room.entity';

@Injectable()
export class DatabaseSeedService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}

  async addRooms(): Promise<Room[]> {
    let theRooms: Room[] = [];

    for (let jsonr of jsonRoomsSeed) {
      const r = new Room();
      r.name = jsonr.name;
      r.description = jsonr.description;

      theRooms.push(r);
    }

    return this.roomsRepository.save(theRooms);
  }

  async deleteAllRooms(): Promise<void> {
    await this.roomsRepository.delete({});
    return Promise.resolve();
  }
}

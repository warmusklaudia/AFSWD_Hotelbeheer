import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import * as jsonRoomsSeed from './data/roomsV2.json' //tsconfig "resolveJsonModule": true,
import * as jsonServicesSeed from './data/services.json'
import { Room } from 'src/rooms/entities/room.entity'
import { Service } from 'src/services/entities/service.entity'

@Injectable()
export class DatabaseSeedService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
  ) {}

  async addRooms(): Promise<Room[]> {
    let theRooms: Room[] = []

    for (let jsonr of jsonRoomsSeed) {
      const r = new Room()
      r.name = jsonr.name
      r.description = jsonr.description
      r.rating = jsonr.rating
      r.category = jsonr.category
      r.location = jsonr.location
      r.accessCode = jsonr.accessCode

      theRooms.push(r)
    }

    return this.roomsRepository.save(theRooms)
  }

  async deleteAllRooms(): Promise<void> {
    await this.roomsRepository.delete({})
    return Promise.resolve()
  }

  async addServices(): Promise<Service[]> {
    let theServices: Service[] = []

    for (let jsons of jsonServicesSeed) {
      const s = new Service()
      s.name = jsons.name
      s.description = jsons.description
      s.price = jsons.price

      theServices.push(s)
    }

    return this.servicesRepository.save(theServices)
  }
}

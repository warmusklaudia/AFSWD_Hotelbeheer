import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { ReservationsService } from '../reservations/reservations.service'
import { DeleteResult, Repository } from 'typeorm'
import { CreateRoomInput } from './dto/create-room.input'
import { UpdateRoomInput } from './dto/update-room.input'
import { Room } from './entities/room.entity'

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
    private readonly reservationsService: ReservationsService,
  ) {}

  create(createRoomInput: CreateRoomInput): Promise<Room> {
    const r = new Room()

    r.name = createRoomInput.name
    r.description = createRoomInput.description
    r.category = createRoomInput.category
    r.rating = createRoomInput.rating
    r.reservationId = createRoomInput.reservationId
    r.location = createRoomInput.location
    r.accessCode = createRoomInput.accessCode

    return this.roomsRepository.save(r)
  }

  findAll(): Promise<Room[]> {
    return this.roomsRepository.find()
  }

  findRoomsWithoutReservation(): Promise<Room[]> {
    return this.roomsRepository.find({
      //@ts-ignore
      reservationId: null,
    })
  }

  async findRoomsWithReservation(): Promise<Room[]> {
    const date = new Date()
    date.setHours(1, 0, 0, 0)
    console.log(await this.roomsRepository.find())
    return this.roomsRepository.find({
      where: {
        //@ts-ignore
        reservationId: { $ne: null },
        // reservation: {
        //   reservationEndDate: date,
        // },
      },
    })
  }

  findOne(id: string): Promise<Room> {
    //@ts-ignore
    return this.roomsRepository.findOne(new ObjectId(id))
  }

  findByString(searchName: string, searchCategory: string): Promise<Room[]> {
    return this.roomsRepository.find({
      //@ts-ignore
      name: { $regex: searchName, $options: 'i' },
      category: { $regex: searchCategory, $options: 'i' },
    })
  }

  async update(updateRoomInput: UpdateRoomInput) {
    //@ts-ignore
    const update = await this.roomsRepository.findOne(updateRoomInput.id)

    update.name = updateRoomInput.name
    update.description = updateRoomInput.description
    update.category = updateRoomInput.category
    update.rating = updateRoomInput.rating
    update.reservationId = updateRoomInput.reservationId
    update.location = updateRoomInput.location
    update.accessCode = updateRoomInput.accessCode

    return this.roomsRepository.save(update)
  }

  async removeReservationFromRoom(id: string): Promise<Room> {
    //@ts-ignore
    const r: Room = await this.findOne(new ObjectId(id))
    r.reservationId = null

    return this.roomsRepository.save(r)
  }

  async addReservationToRoom(id: string, reservationId: string): Promise<Room> {
    //@ts-ignore
    const r: Room = await this.findOne(new ObjectId(id))
    r.reservationId = reservationId

    this.reservationsService.incrementRooms(r.reservationId, [r])

    return this.roomsRepository.save(r)
  }

  remove(id: string): Promise<DeleteResult> {
    return this.roomsRepository.delete(id)
  }
}

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { Room } from 'src/rooms/entities/room.entity'
import { DeleteResult, Repository } from 'typeorm'
import { CreateReservationInput } from './dto/create-reservation.input'
import { UpdateReservationInput } from './dto/update-reservation.input'
import { Reservation } from './entities/reservation.entity'

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,
  ) {}
  create(createReservationInput: CreateReservationInput): Promise<Reservation> {
    const r = new Reservation()

    r.userId = createReservationInput.userId
    r.amountRooms = createReservationInput.amountRooms
    r.amountAdults = createReservationInput.amountAdults
    r.amountChildren = createReservationInput.amountChildren
    r.price = createReservationInput.price
    r.reservationStartDate = createReservationInput.reservationStartDate
    r.reservationEndDate = createReservationInput.reservationEndDate

    return this.reservationsRepository.save(r)
  }

  findAll(): Promise<Reservation[]> {
    return this.reservationsRepository.find()
  }

  findOne(id: string): Promise<Reservation> {
    //@ts-ignore
    return this.reservationsRepository.findOne(new ObjectId(id))
  }

  findByUserId(userId: string): Promise<Reservation[]> {
    //@ts-ignore
    return this.reservationsRepository.find({ userId })
  }

  update(updateReservationInput: UpdateReservationInput) {
    const update = new Reservation()

    update.id = new ObjectId(updateReservationInput.id)
    update.userId = updateReservationInput.userId
    update.amountRooms = updateReservationInput.amountRooms
    update.amountAdults = updateReservationInput.amountAdults
    update.amountChildren = updateReservationInput.amountChildren
    update.price = updateReservationInput.price
    update.reservationStartDate = updateReservationInput.reservationStartDate
    update.reservationEndDate = updateReservationInput.reservationEndDate

    return this.reservationsRepository.save(update)
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.reservationsRepository.delete(id)
  }

  async incrementRooms(id: string, rooms: Room[]): Promise<void> {
    //@ts-ignore
    const r: Reservation = await this.findOne(new ObjectId(id))

    r.rooms = r.rooms ? [...rooms, ...r.rooms] : [...rooms]
    r.amountRooms = r.amountRooms + rooms.length

    await this.reservationsRepository.save(r)
  }
}

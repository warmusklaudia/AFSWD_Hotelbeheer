import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { Room } from '../rooms/entities/room.entity'
import { Cleaning } from '../cleaning/entities/cleaning.entity'
import { DeleteResult, Repository } from 'typeorm'
import { CreateReservationInput } from './dto/create-reservation.input'
import { UpdateReservationInput } from './dto/update-reservation.input'
import { Reservation } from './entities/reservation.entity'

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,
    @InjectRepository(Cleaning)
    private readonly cleaningRepository: Repository<Cleaning>,
  ) {}
  async create(
    createReservationInput: CreateReservationInput,
  ): Promise<Reservation> {
    const r = new Reservation()
    const c = new Cleaning()
    const id = new ObjectId()
    c.changeTheLinens = false
    c.clearTheTrash = false
    c.disinfectSurfaces = false
    c.cleanTheBathroom = false
    c.vacuumTheFloor = false
    c.mopTheFloor = false
    c.finish = false
    const res = await this.cleaningRepository.save(c)

    r.userId = createReservationInput.userId
    r.amountAdults = createReservationInput.amountAdults
    r.amountChildren = createReservationInput.amountChildren
    r.price = createReservationInput.price
    r.breakfastAccess = createReservationInput.breakfastAccess
    r.reservationStartDate = createReservationInput.reservationStartDate
    r.reservationEndDate = createReservationInput.reservationEndDate
    r.cleaningId = res.cleaningId.toString()

    return this.reservationsRepository.save(r)
  }

  findAll(): Promise<Reservation[]> {
    return this.reservationsRepository.find()
  }

  findOne(id: string): Promise<Reservation> {
    //@ts-ignore
    return this.reservationsRepository.findOne(new ObjectId(id))
  }

  findOneByReservationEndDate(id: string): Promise<Reservation> {
    const date = new Date()
    date.setHours(1, 0, 0, 0)
    //@ts-ignore
    return this.reservationsRepository.findOneBy(id, {
      where: {
        reservationEndDate: date,
      },
    })
  }

  findByUserId(userId: string): Promise<Reservation[]> {
    //@ts-ignore
    return this.reservationsRepository.find({ userId })
  }

  findCleaningByReservationEndDate(): Promise<Reservation[]> {
    const date = new Date()
    date.setHours(1, 0, 0, 0)
    return this.reservationsRepository.find({
      where: {
        reservationEndDate: date,
      },
    })
  }

  update(updateReservationInput: UpdateReservationInput) {
    const update = new Reservation()

    update.id = new ObjectId(updateReservationInput.id)
    update.userId = updateReservationInput.userId
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

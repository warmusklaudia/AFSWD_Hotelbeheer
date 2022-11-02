import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { DeleteResult, Repository } from 'typeorm';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,
  ) {}
  create(createReservationInput: CreateReservationInput): Promise<Reservation> {
    const r = new Reservation();

    r.userId = createReservationInput.userId;
    r.rooms = createReservationInput.rooms;
    r.amountAdults = createReservationInput.amountAdults;
    r.amountChildren = createReservationInput.amountChildren;
    r.price = createReservationInput.price;
    r.reservationStartDate = createReservationInput.reservationStartDate;
    r.reservationEndDate = createReservationInput.reservationEndDate;

    return this.reservationsRepository.save(r);
  }

  findAll(): Promise<Reservation[]> {
    return this.reservationsRepository.find();
  }

  findOne(id: string): Promise<Reservation> {
    //@ts-ignore
    return this.reservationsRepository.findOne(new ObjectId(id));
  }

  update(updateReservationInput: UpdateReservationInput) {
    const update = new Reservation();

    update.id = new ObjectId(updateReservationInput.id);
    update.userId = updateReservationInput.userId;
    update.rooms = updateReservationInput.rooms;
    update.amountAdults = updateReservationInput.amountAdults;
    update.amountChildren = updateReservationInput.amountChildren;
    update.price = updateReservationInput.price;
    update.reservationStartDate = updateReservationInput.reservationStartDate;
    update.reservationEndDate = updateReservationInput.reservationEndDate;

    return `This action updates a # reservation`;
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.reservationsRepository.delete(id);
  }
}

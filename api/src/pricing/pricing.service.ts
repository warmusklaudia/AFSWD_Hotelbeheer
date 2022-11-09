import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { Repository } from 'typeorm'
import { CreatePricingInput } from './dto/create-pricing.input'
import { UpdatePricingInput } from './dto/update-pricing.input'
import { Pricing } from './entities/pricing.entity'

@Injectable()
export class PricingService {
  constructor(
    @InjectRepository(Pricing)
    private readonly pricingRepository: Repository<Pricing>,
  ) {}

  create(createPricingInput: CreatePricingInput): Promise<Pricing> {
    const p = new Pricing()

    p.reservationTime = createPricingInput.reservationTime
    p.child = createPricingInput.child
    p.adult = createPricingInput.adult
    p.night = createPricingInput.night
    p.standard = createPricingInput.standard
    p.luxe = createPricingInput.luxe
    p.breakfast = createPricingInput.breakfast

    return this.pricingRepository.save(p)
  }

  findAll(): Promise<Pricing[]> {
    return this.pricingRepository.find()
  }

  findOne(id: string): Promise<Pricing> {
    //@ts-ignore
    return this.pricingRepository.findOne(new ObjectId(id))
  }

  findByReservationTime(searchReservationTime: string): Promise<Pricing> {
    return this.pricingRepository.findOneBy({
      //@ts-ignore
      where: {
        reservationTime: searchReservationTime,
      },
    })
  }

  async update(updatePricingInput: UpdatePricingInput) {
    const update = await this.pricingRepository.findOne(
      //@ts-ignore
      new ObjectId(updatePricingInput.id),
    )
    update.child = updatePricingInput.child
    update.adult = updatePricingInput.adult
    update.night = updatePricingInput.night
    update.standard = updatePricingInput.standard
    update.luxe = updatePricingInput.luxe
    update.breakfast = updatePricingInput.breakfast
    await this.pricingRepository.save(update)
    //@ts-ignore
    return this.pricingRepository.findOne(updatePricingInput.id)
  }
}

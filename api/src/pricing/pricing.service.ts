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

    p.rateName = createPricingInput.rateName
    p.price = createPricingInput.price

    return this.pricingRepository.save(p)
  }

  findAll(): Promise<Pricing[]> {
    return this.pricingRepository.find()
  }

  findOne(id: string): Promise<Pricing> {
    //@ts-ignore
    return this.pricingRepository.findOne(new ObjectId(id))
  }

  async update(updatePricingInput: UpdatePricingInput) {
    const update = await this.pricingRepository.findOne(
      //@ts-ignore
      new ObjectId(updatePricingInput.rateId),
    )
    update.rateName = updatePricingInput.rateName
    update.price = updatePricingInput.price
    await this.pricingRepository.save(update)
    //@ts-ignore
    return this.pricingRepository.findOne(updatePricingInput.rateId)
  }
}

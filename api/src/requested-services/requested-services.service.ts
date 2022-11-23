import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { CreateRequestedServiceInput } from './dto/create-requested-service.input'
import { UpdateRequestedServiceInput } from './dto/update-requested-service.input'
import { RequestedService } from './entities/requested-service.entity'
import { ObjectId } from 'mongodb'

@Injectable()
export class RequestedServicesService {
  constructor(
    @InjectRepository(RequestedService)
    private requestedServiceRepository: Repository<RequestedService>,
  ) {}

  create(
    createRequestedServiceInput: CreateRequestedServiceInput,
  ): Promise<RequestedService> {
    const rs = new RequestedService()

    rs.serviceId = createRequestedServiceInput.serviceId
    rs.userId = createRequestedServiceInput.userId
    rs.message = createRequestedServiceInput.message
    rs.requestedDate = createRequestedServiceInput.requestedDate

    return this.requestedServiceRepository.save(rs)
  }

  findAll(): Promise<RequestedService[]> {
    return this.requestedServiceRepository.find()
  }

  findOne(id: string): Promise<RequestedService> {
    //@ts-ignore
    return this.requestedServiceRepository.findOne(new ObjectId(id))
  }

  findByUserId(userId: string): Promise<RequestedService[]> {
    //@ts-ignore
    return this.requestedServiceRepository.find({ userId })
  }

  findByServiceId(serviceId: string): Promise<RequestedService[]> {
    //@ts-ignore
    return this.requestedServiceRepository.find({ serviceId })
  }

  async update(updateRequestedServiceInput: UpdateRequestedServiceInput) {
    const update = await this.requestedServiceRepository.findOne(
      //@ts-ignore
      updateRequestedServiceInput.id,
    )

    update.serviceId = updateRequestedServiceInput.serviceId
    update.userId = updateRequestedServiceInput.userId
    update.message = updateRequestedServiceInput.message
    update.requestedDate = updateRequestedServiceInput.requestedDate

    return this.requestedServiceRepository.save(update)
  }

  remove(id: string): Promise<DeleteResult> {
    return this.requestedServiceRepository.delete(id)
  }
}

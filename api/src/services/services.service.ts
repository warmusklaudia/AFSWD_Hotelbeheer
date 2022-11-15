import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { DeleteResult, Repository } from 'typeorm';
import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
  ) {}

  create(createServiceInput: CreateServiceInput): Promise<Service> {
    const s = new Service();

    s.name = createServiceInput.name;
    s.message = createServiceInput.message;
    s.requestedDate = createServiceInput.requestedDate;

    return this.servicesRepository.save(s);
  }

  findAll(): Promise<Service[]> {
    return this.servicesRepository.find();
  }

  findOne(id: string): Promise<Service> {
    //@ts-ignore
    return this.servicesRepository.findOne(new ObjectId(id));
  }

  async update(updateServiceInput: UpdateServiceInput) {
    //@ts-ignore
    const update = await this.servicesRepository.findOne(updateServiceInput.id);

    update.name = updateServiceInput.name;
    update.message = updateServiceInput.message;
    update.requestedDate = updateServiceInput.requestedDate;

    return this.servicesRepository.save(update);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.servicesRepository.delete(id);
  }
}

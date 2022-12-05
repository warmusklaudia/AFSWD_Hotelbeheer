import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { DeleteResult, Repository } from 'typeorm'
import { CreateCleaningInput } from './dto/create-cleaning.input'
import { UpdateCleaningInput } from './dto/update-cleaning.input'
import { Cleaning } from './entities/cleaning.entity'

@Injectable()
export class CleaningService {
  constructor(
    @InjectRepository(Cleaning)
    private readonly cleaningRepository: Repository<Cleaning>,
  ) {}

  create(createCleaningInput: CreateCleaningInput): Promise<Cleaning> {
    const c = new Cleaning()
    c.changeTheLinens = createCleaningInput.changeTheLinens
    c.clearTheTrash = createCleaningInput.clearTheTrash
    c.disinfectSurfaces = createCleaningInput.disinfectSurfaces
    c.cleanTheBathroom = createCleaningInput.cleanTheBathroom
    c.vacuumTheFloor = createCleaningInput.vacuumTheFloor
    c.mopTheFloor = createCleaningInput.mopTheFloor
    c.finish = createCleaningInput.finish
    c.cleanedById = createCleaningInput.cleanedById

    return this.cleaningRepository.save(c)
  }

  findAll(): Promise<Cleaning[]> {
    return this.cleaningRepository.find()
  }

  findOne(id: string): Promise<Cleaning> {
    //@ts-ignore
    return this.cleaningRepository.findOne(new ObjectId(id))
  }

  async update(updateCleaningInput: UpdateCleaningInput) {
    //@ts-ignore
    const update = await this.cleaningRepository.findOne(updateCleaningInput.id)

    update.changeTheLinens = updateCleaningInput.changeTheLinens
    update.clearTheTrash = updateCleaningInput.clearTheTrash
    update.disinfectSurfaces = updateCleaningInput.disinfectSurfaces
    update.cleanTheBathroom = updateCleaningInput.cleanTheBathroom
    update.vacuumTheFloor = updateCleaningInput.vacuumTheFloor
    update.mopTheFloor = updateCleaningInput.mopTheFloor
    update.finish = updateCleaningInput.finish
    update.cleanedById = updateCleaningInput.cleanedById

    return this.cleaningRepository.save(update)
  }

  remove(id: string): Promise<DeleteResult> {
    return this.cleaningRepository.delete(id)
  }
}

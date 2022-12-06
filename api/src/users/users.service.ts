import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { Service } from '../services/entities/service.entity'
import { DeleteResult, Repository } from 'typeorm'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    const u = new User()

    u.uid = createUserInput.uid
    u.imgUrl = createUserInput.imgUrl
    return this.userRepository.save(u)
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  findOne(id: string): Promise<User> {
    //@ts-ignore
    return this.userRepository.findOne(new ObjectId(id))
  }

  findOneByUid(uid: string): Promise<User> {
    return this.userRepository.findOneBy({ uid })
  }

  async update(updateUserInput: UpdateUserInput) {
    //@ts-ignore
    const update = await this.userRepository.findOne(updateUserInput.id)

    update.imgUrl = updateUserInput.imgUrl
    update.firstName = updateUserInput.firstName
    update.lastName = updateUserInput.lastName
    update.preferredLanguage = updateUserInput.preferredLanguage
    update.role.name = updateUserInput.role.name
    update.imgUrl = updateUserInput.imgUrl

    return this.userRepository.save(update)
  }

  remove(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id)
  }

  async addToRequestedServices(id: string, services: Service[]) {
    //@ts-ignore
    const u: User = await this.findOne(new ObjectId(id))

    u.requestedServices = u.requestedServices
      ? [...services, ...u.requestedServices] // merge the current services with the new ones
      : [...services]

    return this.userRepository.save(u)
  }

  async addCreditsToUser(id: string, amount: number) {
    //@ts-ignore
    const u: User = await this.findOne(new ObjectId(id))

    u.amountCredits ? (u.amountCredits += amount) : (u.amountCredits = amount)

    return this.userRepository.save(u)
  }
}

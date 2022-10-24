import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from "mongodb";
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    const u = new User();

    u.amountCredits = createUserInput.amountCredits;
    u.reservations = createUserInput.reservations;
    u.preferredLanguage = createUserInput.preferredLanguage;
    u.breakfastCode = createUserInput.breakfastCode;

    return this.userRepository.save(u);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string):Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  update(updateUserInput: UpdateUserInput) {
    const update = new User();

    update.id = new ObjectId(updateUserInput.id);
    update.amountCredits = updateUserInput.amountCredits;
    update.reservations = updateUserInput.reservations;
    update.preferredLanguage = updateUserInput.preferredLanguage;
    update.breakfastCode = updateUserInput.breakfastCode;

    return this.userRepository.save(update);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}

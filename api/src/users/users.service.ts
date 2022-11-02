import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
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

    u.uid = createUserInput.uid;
    // u.preferredLanguage = createUserInput.preferredLanguage;
    // u.amountCredits = createUserInput.amountCredits;
    // u.reservations = createUserInput.reservations;
    // u.breakfastCode = createUserInput.breakfastCode;
    return this.userRepository.save(u);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    //@ts-ignore
    return this.userRepository.findOne(new ObjectId(id));
  }

  findOneByUid(uid: string): Promise<User> {
    return this.userRepository.findOneBy({ uid });
  }

  update(updateUserInput: UpdateUserInput) {
    const update = new User();

    update.id = new ObjectId(updateUserInput.id);
    //update.preferredLanguage = updateUserInput.preferredLanguage;

    return this.userRepository.save(update);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}

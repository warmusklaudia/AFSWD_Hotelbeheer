import { CreateUserInput } from '../dto/create-user.input'
import { User } from '../entities/user.entity'
import { ObjectId } from 'mongodb'
export const createUserInputStub = (): CreateUserInput => {
  const u = new CreateUserInput()

  u.uid = 'tester'

  return u
}

export const createUser = (): User => {
  const u = new User()

  u.id = new ObjectId('6384bd4926a01d1ff4bef99d')
  u.amountCredits = 0
  u.reservations = 0
  u.preferredLanguage = ''
  u.uid = 'tester'

  return u
}

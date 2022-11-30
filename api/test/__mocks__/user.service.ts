import { createUser } from 'src/users/stubs/user.stub'

export const UsersService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(createUser()),
  findAll: jest.fn().mockResolvedValue([createUser()]),
  findOne: jest.fn().mockResolvedValue(createUser()),
  update: jest.fn().mockResolvedValue(createUser()),
  remove: jest.fn().mockResolvedValue({ affected: 1 }),
})

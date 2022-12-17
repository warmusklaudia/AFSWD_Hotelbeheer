import { createUser } from 'src/users/stubs/user.stub'

export const UsersService = jest.fn().mockReturnValue({
  findOneByUid: jest.fn().mockResolvedValue(createUser()),
})

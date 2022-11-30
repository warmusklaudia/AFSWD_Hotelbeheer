import { CreateRoomInput } from '../dto/create-room.input'
import { Room } from '../entities/room.entity'
import { ObjectId } from 'mongodb'
export const createRoomInputStub = (): CreateRoomInput => {
  const r = new CreateRoomInput()
  
  r.name = 'Nienna Suite'
  r.description = 'De Nienna suite is onze standaard suite.'
  r.rating = 4
  r.category = 'standard'
  r.location = 'other'
  r.accessCode = '1234'

  return r
}

export const createRoom = (): Room => {
  const r = new Room()

  r.id = new ObjectId('637f8f441569b77268921f43')
  r.name = 'Nienna Suite'
  r.description = 'De Nienna suite is onze standaard suite.'
  r.rating = 4
  r.category = 'standard'
  r.location = 'other'
  r.accessCode = '1234'

  return r
}

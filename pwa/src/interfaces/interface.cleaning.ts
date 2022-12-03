import { User } from './interface.user'

export default interface Cleaning {
  cleaningId: string
  changeTheLinens: boolean
  clearTheTrash: boolean
  disinfectSurfaces: boolean
  cleanTheBathroom: boolean
  vacuumTheFloor: boolean
  mopTheFloor: boolean
  finish: boolean
  finishDate: Date
  cleanedById: string
  cleanedBy: User
  createdAt?: Date
  updatedAt?: Date
}

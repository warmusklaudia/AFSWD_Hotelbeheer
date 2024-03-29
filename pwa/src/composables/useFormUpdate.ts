import { reactive, readonly, ref } from 'vue'
import { useRouter } from 'vue-router'
import Room from '../interfaces/interface.room'
import useAuthentication from './useAuthentication'

const { user } = useAuthentication()

const reservationId = ref('')
const currentStep = ref(1)
const amountDays = ref(0)

const reservationFormInput = reactive({
  userId: user.value!.uid,
  amountAdults: 0,
  amountChildren: 0,
  price: 0,
  reservationStartDate: new Date().toISOString().slice(0, 10),
  reservationEndDate: '',
  breakfastAccess: false,
})

const selectedRoom: Room = reactive({
  id: '',
  name: '',
  description: '',
  rating: 0,
  category: '',
  location: '',
  accessCode: '',
})

export default () => {
  const { push } = useRouter()

  const setReservationId = (id: string) => {
    reservationId.value = id
  }

  const resetReservationForm = () => {
    reservationFormInput.amountAdults = 0
    reservationFormInput.amountChildren = 0
    reservationFormInput.price = 0
    reservationFormInput.reservationStartDate = new Date()
      .toISOString()
      .slice(0, 10)
    reservationFormInput.reservationEndDate = ''
    reservationFormInput.breakfastAccess = false

    selectedRoom.id = ''

    amountDays.value = 0
  }

  const setSelectedRoom = (room: Room) => {
    selectedRoom.id = room.id
    selectedRoom.name = room.name
    selectedRoom.description = room.description
    selectedRoom.rating = room.rating
    selectedRoom.category = room.category
    selectedRoom.location = room.location
    selectedRoom.accessCode = room.accessCode
  }

  const setReservationStartDate = (date: string) => {
    reservationFormInput.reservationStartDate = date
  }

  const setEndDate = (e: Event) => {
    //setEnDate sets the end date to the start date + the amount of days the user has entered
    amountDays.value = +(e.target as HTMLInputElement).value
    const endDate = new Date(reservationFormInput.reservationStartDate)
    endDate.setDate(endDate.getDate() + amountDays.value)
    reservationFormInput.reservationEndDate = endDate
      .toISOString()
      .split('T')[0]
  }

  const setAmountAdults = (e: Event) => {
    reservationFormInput.amountAdults = parseInt(
      (e.target as HTMLInputElement).value,
    )
  }

  const setAmountChildren = (e: Event) => {
    reservationFormInput.amountChildren = parseInt(
      (e.target as HTMLInputElement).value,
    )
  }

  const setBreakfast = (e: Event) => {
    reservationFormInput.breakfastAccess = (
      e.target as HTMLInputElement
    ).checked
  }

  const setPrice = (price: number) => {
    reservationFormInput.price = price
  }

  const changeStepTo = (step: number) => {
    push('/reservations/add/' + step)
  }

  return {
    currentStep: readonly(currentStep),
    reservationFormInput: readonly(reservationFormInput),
    selectedRoom: readonly(selectedRoom),
    amountDays: readonly(amountDays),
    reservationId: readonly(reservationId),

    setReservationId,
    resetReservationForm,
    setEndDate,
    setSelectedRoom,
    setAmountAdults,
    setAmountChildren,
    setBreakfast,
    setPrice,
    changeStepTo,
  }
}

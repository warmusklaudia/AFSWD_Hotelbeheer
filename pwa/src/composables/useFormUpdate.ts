import { reactive, readonly, ref } from 'vue'
import { useRouter } from 'vue-router'

const currentStep = ref(1)

const reservationFormInput = reactive({
  userId: '',
  rooms: 0,
  amountAdults: 0,
  amountChildren: 0,
  price: 0,
  reservationStartDate: new Date().toISOString().slice(0, 10),
  reservationEndDate: '',
  room: '',
  breakfast: false,
})

const selectedRoom = reactive({
  id: '',
  name: '',
  description: '',
  rating: '',
  category: '',
})

export default () => {
  const { push } = useRouter()

  const setRoom = (room: string) => {
    reservationFormInput.room = room
    console.log(reservationFormInput)
  }

  const setReservationStartDate = (date: string) => {
    reservationFormInput.reservationStartDate = date
    console.log(reservationFormInput)
  }

  const setEndDate = (e: Event) => {
    //setEnDate sets the end date to the start date + the amount of days the user has entered
    const amountDays = +(e.target as HTMLInputElement).value
    const endDate = new Date(reservationFormInput.reservationStartDate)
    endDate.setDate(endDate.getDate() + amountDays)
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
    reservationFormInput.breakfast = (e.target as HTMLInputElement).checked
    console.log(reservationFormInput.breakfast)
  }

  const changeStepTo = (step: number) => {
    console.log(reservationFormInput)
    push('/reservations/add/' + step)
  }

  return {
    currentStep: readonly(currentStep),
    reservationFormInput: readonly(reservationFormInput),

    setEndDate,
    setRoom,
    setAmountAdults,
    setAmountChildren,
    setBreakfast,
    changeStepTo,
  }
}

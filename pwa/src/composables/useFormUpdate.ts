import { reactive, ref } from 'vue'

export default () => {
  const currentStep = ref(1)

  const reservationInput = reactive({
    userId: '',
    rooms: 0,
    amountAdults: 0,
    amountChildren: 0,
    price: 0,
    reservationStartDate: null,
    reservationEndDate: null,
  })

  const updateRoomInput = reactive({
    reservation: '',
  })

  return {
    reservationInput,
    currentStep,
  }
}

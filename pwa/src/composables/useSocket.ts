import { ref } from 'vue'
import { io, Socket } from 'socket.io-client'
import useCustomUser from './useCustomUser'
import { Reservation } from '../interfaces/interface.reservation'

// SHARED
const socketServer = ref<Socket>()
const connected = ref<boolean>(false)
const newNotification = ref<boolean>(false)

export default () => {
  const { customUser } = useCustomUser()

  const _connect = () => {
    console.log('Connected')
    connected.value = true
  }

  const sendNewReservation = (reservation: any) => {
    socketServer.value?.emit('reservation:created', reservation)
    console.log(reservation)
    newNotification.value = true
    console.log(newNotification)
  }

  const sendNewRequestedService = (requestedService: any) => {
    socketServer.value?.emit('requestedService:created', requestedService)
    console.log(requestedService)
    newNotification.value = true
    console.log(newNotification)
  }

  const handleNewReservation = () => {
    socketServer.value?.on('reservation:created', (reservation: any) => {
      console.log(reservation)
    })
  }

  const handleNewRequestedService = () => {
    socketServer.value?.on(
      'requestedService:created',
      (requestedService: any) => {
        console.log(requestedService)
      },
    )
  }

  const _disconnect = () => {
    console.log('Disconnected')
    connected.value = false
  }

  const _error = (error: any) => {
    console.error(error)
  }

  const disconnectFromServer = () => {
    if (socketServer.value) {
      socketServer.value.disconnect()
      socketServer.value = undefined
    }
  }

  const connectToServer = () => {
    if (socketServer.value) {
      return
    }

    socketServer.value = io('ws://[::1]:3004', {
      transports: ['websocket'],
    })

    socketServer.value.on('connect', _connect)
    socketServer.value.on('disconnect', _disconnect)
    socketServer.value.on('error', _error)
  }

  return {
    socketServer,
    connected,
    newNotification,
    sendNewReservation,
    connectToServer,
    disconnectFromServer,
    handleNewReservation,
    sendNewRequestedService,
    handleNewRequestedService,
  }
}

import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { Server } from 'socket.io'
import { ReservationsService } from '../reservations/reservations.service'
import { UsePipes } from '@nestjs/common'
import { CreateReservationInput } from '../reservations/dto/create-reservation.input'
import { CreateRequestedServiceInput } from 'src/requested-services/dto/create-requested-service.input'
@WebSocketGateway(3004)
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly reservationService: ReservationsService) {}
  @WebSocketServer()
  server: Server

  numberOfClients: number = 0

  @SubscribeMessage('reservation:created')
  async handleNewReservation(
    @MessageBody() data: CreateReservationInput,
    @ConnectedSocket() client: Socket,
  ) {
    this.server.emit('reservation:newReservation', data)
    console.log(data)
  }

  @SubscribeMessage('requestedService:created')
  async handleNewRequestedService(
    @MessageBody() data: CreateRequestedServiceInput,
    @ConnectedSocket() client: Socket,
  ) {
    this.server.emit('requestedService:newRequestedService', data)
    console.log(data)
  }

  handleDisconnect(client: any) {
    this.numberOfClients--
    this.server.emit('users:userLeaving', {
      connectedUsers: this.numberOfClients,
    })
    console.log('A client has disconnected')
    console.log(`Number of clients: ${this.numberOfClients}`)
  }

  handleConnection(client: any, ...args: any[]) {
    this.numberOfClients++
    this.server.emit('users:newuserconnetected', {
      connectedUsers: this.numberOfClients,
    })
    console.log('A client has connected')
    console.log(`Number of clients: ${this.numberOfClients}`)
  }
}

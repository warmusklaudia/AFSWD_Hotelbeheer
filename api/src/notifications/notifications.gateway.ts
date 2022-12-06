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
import { MyWebSocketValidationPipe } from 'src/bootstrap/exceptions/MyWebSocketValidationPipe'
import { UsePipes } from '@nestjs/common'
import { CreateReservationInput } from 'src/reservations/dto/create-reservation.input'
import { Reservation } from 'src/reservations/entities/reservation.entity'
@WebSocketGateway(3004)
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly reservationService: ReservationsService) {}
  @WebSocketServer() //ipv afterInit()
  server: Server

  numberOfClients: number = 0

  // @UsePipes(new MyWebSocketValidationPipe())
  @SubscribeMessage('reservation:created')
  async handleNewReservation(
    @MessageBody() data: CreateReservationInput,
    @ConnectedSocket() client: Socket,
  ) {
    // if new reservation is created, notify all clients
    this.server.emit('reservation:newReservation', data)
    console.log(data)
  }

  handleDisconnect(client: any) {
    //throw new Error('Method not implemented.')
    this.numberOfClients--
    this.server.emit('users:userLeaving', {
      connectedUsers: this.numberOfClients,
    })
    console.log('A client has disconnected')
    console.log(`Number of clients: ${this.numberOfClients}`)
  }

  handleConnection(client: any, ...args: any[]) {
    this.numberOfClients++
    // Notify connected clients of current users
    this.server.emit('users:newuserconnetected', {
      connectedUsers: this.numberOfClients,
    })
    console.log('A client has connected')
    console.log(`Number of clients: ${this.numberOfClients}`)
  }
}

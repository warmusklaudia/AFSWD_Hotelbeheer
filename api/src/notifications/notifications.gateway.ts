import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class NotificationsGateway {
  @WebSocketServer() //ipv afterInit()
  server: Server;

  numberOfClients: number = 0;

  @SubscribeMessage('notifications')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
  

  handleDisconnect(client: any) {
    //throw new Error('Method not implemented.')
    this.numberOfClients--;
    this.server.emit('users:userLeaving', {
      connectedUsers: this.numberOfClients,
    });
  }
  handleConnection(client: any, ...args: any[]) {
    this.numberOfClients++;
    // Notify connected clients of current users
    this.server.emit('users:newuserconnetected', {
      connectedUsers: this.numberOfClients,
    });
    console.log('A client has connected');
    console.log(`Number of clients: ${this.numberOfClients}`);
  }
}

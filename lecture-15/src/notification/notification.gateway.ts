import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

import { NOTIFICATON_GATEWAY_EVENTS } from './constants';
import { NewPostDataDto } from './new-post-data.dto';

@WebSocketGateway({
  namespace: '/notification',
  cors: { origin: '*' },
})
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger = new Logger('NotificationGateway');

  afterInit() {
    this.logger.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage(NOTIFICATON_GATEWAY_EVENTS.newPost)
  handleNewPost(@MessageBody() data: NewPostDataDto) {
    this.server.emit(NOTIFICATON_GATEWAY_EVENTS.newPost, data);
  }
}

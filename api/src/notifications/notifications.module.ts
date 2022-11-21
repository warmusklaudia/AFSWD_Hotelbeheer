import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';

@Module({
  imports: [],
  providers: [NotificationsGateway],
  exports: [NotificationsGateway],
})
export class NotificationsModule {}

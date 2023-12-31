// gateway.module.ts
import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';

@Module({
  providers: [MessageGateway],
  exports: [MessageGateway] // Exporte o MessageGateway para que ele possa ser usado em outros módulos.
})
export class GatewayModule {}

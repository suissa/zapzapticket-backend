import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ConnectionDocument = HydratedDocument<Connection>;

@Schema({ timestamps: true })
export class Connection {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  instanceName: string;

  @Prop()
  instanceStatus: boolean;
}

export const ConnectionSchema = SchemaFactory.createForClass(Connection);

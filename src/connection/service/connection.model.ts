export class Connection {
  _id?: string;
  name: string;
  phone: string;
  instanceName: string;
  instanceStatus: boolean;
  messages: [];
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(partial: Partial<Connection>) {
    Object.assign(this, partial);
  }

  public toObject() {
    return this;
  }
}

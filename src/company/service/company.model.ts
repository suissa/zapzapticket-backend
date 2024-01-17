export class Company {
  _id?: string;
  name: string;
  phone: string;
  password: string;
  status: string;
  planId: {};
  planName?: string;
  campaignsEnabled?: boolean;
  dueDate?: string;
  recurrence?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(partial: Partial<Company>) {
    Object.assign(this, partial);
  }
  
  public toObject() {
    return this;
  }
}

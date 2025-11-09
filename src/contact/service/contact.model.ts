export class Contact {
  _id?: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  city: string;
  state: string;
  country: string;
  profilePictureUrl: string;
  badges: [];
  messages: [];
  // groupId: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(partial: Partial<Contact>) {
    Object.assign(this, partial);
  }

  public toObject() {
    return this;
  }
}
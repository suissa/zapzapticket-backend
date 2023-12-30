import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from '../schema/contact.schema';
import mongoose, { Model } from 'mongoose';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { CreateContactDtoPartial } from '../dto/create-contact.dto';
import { ConnectionService } from 'src/connection/service/connection.service';



interface ImportContactsRequest {
  groupId: string;
  participants: Record<string, string>;
}

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name)
    private contactModel: Model<Contact>,
    private connectionService: ConnectionService
  ) {}

  async create(request: CreateContactDtoPartial): Promise<Contact> {
    return await this.contactModel.create(request);
  }

  async findAll(): Promise<Contact[]> {
    return await this.contactModel.find().sort({ name: 1 });
  }

  async findOne(id: string): Promise<Contact> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    return await this.contactModel.findOne({ _id: id });
  }

  async findOneByPhone(phone: string): Promise<Contact> {
    return await this.contactModel.findOne({ phone });
  }

  async update(id: string, request: UpdateContactDto) {
    return await this.contactModel.findByIdAndUpdate(id, request, {
      new: true,
      runValidators: true,
    });
  }

  async updateAll(request: UpdateContactDto) {
    return await this.contactModel.updateMany({}, request);
  }

  async delete(id: string) {
    return await this.contactModel.findByIdAndDelete(id);
  }


  async saveSentTextMessage(request: any): Promise<any> {
    console.log("request: ", request);
    const contact = await this.contactModel.findOne({ phone: request.phone });

    if (!contact) {
      // throw new NotFoundException(`Contact with phone ${request.phone} not found`);
      const _contact = {
        name: request.name,
        phone: request.phone,
        messages: [],
      }
      const result = await this.create(_contact);
      console.log("Contact Service saved new contact: ", result)
      return result;
    }
    const message = {
      type: "sent",
      typeMessage: "text",
      text: request.message,
      createdAt: new Date(),
      phone: request.phoneReply,
    }
    contact.messages.push(message);
    return await contact.save();
  }

  async saveReceivedTextMessage(request: any): Promise<any> {
    console.log("request: ", request);
    const contact = await this.contactModel.findOne({ phone: request.phone });

    console.log("contact: ", contact);
    if (!contact) {
      throw new NotFoundException(`Contact with phone ${request.phone} not found`);
    }
    const message = {
      type: "received",
      typeMessage: "text",
      text: request.message,
      createdAt: new Date(),
      phone: request.phoneReply,
    }
    contact.messages.push(message);
    console.log("contact depois: ", contact);
    return await contact.save();
  }

  async getAllMessages(): Promise<any> {
    const contacts = await this.contactModel.find({}).lean();

    const contactsLastMessage = contacts.map(contact => {
      const lastMessage = contact.messages.pop();

      return {
        ...contact,
        messages: lastMessage ? [lastMessage] : [],
      };
    }).filter(contact => contact.messages.length > 0)
    .sort((a, b) => {
      return new Date(b.messages[0].createdAt).getTime() - new Date(a.messages[0].createdAt).getTime();
    });

    return contactsLastMessage;
  }

  async updateTicketStatus(id: string, request: UpdateContactDto): Promise<any> {
    return await this.contactModel.findByIdAndUpdate(id, request, {
      new: true,
      runValidators: true,
    });
  }

  async getContactByPhoneAndConnection(phone: string, connectionPhone: string): Promise<Contact> {
    return this.contactModel.findOne({ phone, connectionPhone });
  }

  async importContacts(instanceName: string, request: ImportContactsRequest): Promise<any> {
    console.log("importContacts instanceName", instanceName)
    console.log("importContacts request", request)
    console.log("importContacts request.participants", request.participants)
    const { groupId, participants } = request;
    const connection = await this.connectionService.getConnectionByInstanceName(instanceName);

    if (!connection) {
      // throw new NotFoundException(`Connection with instanceName ${instanceName} not found`);
      console.log(`connection ${instanceName} not found!`);
      return false;
    }

    const connectionPhone = connection.phone;

    for (const [key, value] of Object.entries(participants)) {
      const contact = {
        phone: key.replace("@s.whatsapp.net", ""),
        profilePictureUrl: value,
        groupId,
        connectionPhone
      };

      const findContact = await this.getContactByPhoneAndConnection(value, connectionPhone);

      if (findContact) {
        console.log("importContacts Contact ja existe", findContact);
        return false;
      }

      try {
        const result = await this.create(contact);
        console.log("importContacts result", result);
      } catch (error) {
        throw new BadRequestException("Erro ao importar contatos");
      }
    }
    return await this.contactModel.find({ connectionPhone });
  }
}

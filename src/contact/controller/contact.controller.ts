import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ContactService } from "../service/contact.service";
import { CreateContactDto } from "../dto/create-contact.dto";
import { UpdateContactDto } from "../dto/update-contact.dto";

@Controller("contacts")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() request: CreateContactDto) {
    return this.contactService.create(request);
  }

  @Post("/import/:instanceName")
  @HttpCode(HttpStatus.OK)
  importContacts(@Body() request: any, @Param("instanceName") instanceName: string) {
    return this.contactService.importContacts(instanceName, request);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    console.log("findAll");
    return this.contactService.findAll();
  }


  @Get("/messages")
  @HttpCode(HttpStatus.OK)
  getFirstMessages() {
    return this.contactService.getFirstMessages();
  }

  @Get("/messages/all")
  @HttpCode(HttpStatus.OK)
  getAllMessages() {
    return this.contactService.getAllMessages();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  findOne(@Param("id") id: string) {
    return this.contactService.findOne(id);
  }


  @Patch("/ticketStatus/:id")
  @HttpCode(HttpStatus.OK)
  updateTicketStatus(@Param("id") id: string, @Body() request: any) {
    return this.contactService.updateTicketStatus(id, request);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  update(@Param("id") id: string, @Body() request: UpdateContactDto) {
    return this.contactService.update(id, request);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  delete(@Param("id") id: string) {
    return this.contactService.delete(id);
  }
}

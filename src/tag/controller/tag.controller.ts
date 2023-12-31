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
import { TagService } from "../service/tag.service";
import { CreateTagDto } from "../dto/create-tag.dto";
import { UpdateTagtDto } from "../dto/update-tag.dto";

@Controller("tags")
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() request: CreateTagDto) {
    return this.tagService.create(request);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.tagService.findAll();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  findOne(@Param("id") id: string) {
    return this.tagService.findOne(id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  update(@Param("id") id: string, @Body() request: UpdateTagtDto) {
    return this.tagService.update(id, request);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  delete(@Param("id") id: string) {
    return this.tagService.delete(id);
  }
}
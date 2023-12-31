import { Module } from '@nestjs/common';
import { TagService } from './service/tag.service';
import { TagController } from './controller/tag.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './schema/tag.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
  ],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}

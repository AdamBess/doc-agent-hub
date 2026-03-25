import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './document.entity';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService],
  imports: [TypeOrmModule.forFeature([Document])],
})
export class DocumentsModule {}

import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { DocumentsService } from 'src/documents/documents.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [DocumentsService],
})
export class ChatModule {}

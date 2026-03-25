import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { DocumentsModule } from 'src/documents/documents.module';

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [DocumentsModule],
})
export class ChatModule {}

import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { RouterService } from './router.service';
import { AgentService } from './agent.service';
import { DocumentsModule } from 'src/documents/documents.module';

@Module({
  controllers: [ChatController],
  providers: [ChatService, RouterService, AgentService],
  imports: [DocumentsModule],
})
export class ChatModule {}

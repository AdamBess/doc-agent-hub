import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { OrchestratorService } from './orchestrator.service';
import { RouterService } from './router.service';
import { AgentService } from './agent.service';
import { DocumentsModule } from 'src/documents/documents.module';

@Module({
  controllers: [ChatController],
  providers: [OrchestratorService, RouterService, AgentService],
  imports: [DocumentsModule],
})
export class ChatModule {}

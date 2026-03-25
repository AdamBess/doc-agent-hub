import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  async chat(@Body() body: { question: string; documentId?: number }) {
    const result = await this.chatService.workflow.invoke({
      question: body.question,
      documentId: body.documentId,
    });
    return { answer: result.messages };
  }
}

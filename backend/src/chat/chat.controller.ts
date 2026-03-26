import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  async chat(@Body() body: { question: string; threadId?: string }) {
    const result = await this.chatService.workflow.invoke(
      { question: body.question },
      { configurable: { thread_id: body.threadId ?? 'default' } },
    );

    return { answer: result.messages.at(-1) };
  }
}

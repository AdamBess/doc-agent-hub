import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  async chat(@Body() body: { question: string; threadId?: string }) {
    if (!body.question?.trim()) {
      throw new HttpException('Question is required.', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.chatService.workflow.invoke(
        { question: body.question },
        { configurable: { thread_id: body.threadId ?? 'default' } },
      );

      return { answer: result.messages.at(-1) };
    } catch {
      throw new HttpException(
        'Failed to process your question. Please try again.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

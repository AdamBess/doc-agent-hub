import { Injectable } from '@nestjs/common';
import { initChatModel } from 'langchain';

@Injectable()
export class ChatService {
  async chat() {
    const model = await initChatModel('gpt-5');
  }
}

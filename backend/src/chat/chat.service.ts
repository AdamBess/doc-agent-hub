import { ChatOpenAI } from '@langchain/openai';
import { Injectable } from '@nestjs/common';
import { RouteDecisionSchema, AgentState } from './agent.state';

@Injectable()
export class ChatService {
  async router(state: typeof AgentState.State) {
    const routerLlm = new ChatOpenAI({ model: 'gpt-5-mini' });

    const structuredLlm = routerLlm.withStructuredOutput(RouteDecisionSchema);

    const result = await structuredLlm.invoke([
      {
        role: 'system',
        content: `You are a router agent. Analyze the user's question and decide which agent should handle it.

Routes:
- "retrieve": The user asks a specific question about the content of a document (e.g. "What does chapter 3 say?", "Explain the section about...")
- "summarize": The user wants a summary of an entire document (e.g. "Summarize the document", "What is the document about?")
- "list": The user asks about their uploaded documents (e.g. "Which documents do I have?", "Show me my uploads")

Respond only with the appropriate route.
`,
      },
      { role: 'user', content: state.question },
    ]);

    return { routeDecision: result.route };
  }

  routeToAgents(state: typeof AgentState.State) {
    switch (state.routeDecision) {
      case 'retrieve':
        return 'retriever';
      case 'summarize':
        return 'summarizer';
      case 'list':
        return 'listDocuments';
    }
  }
}

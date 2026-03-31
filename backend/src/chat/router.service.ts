import { ChatOpenAI } from '@langchain/openai';
import { Injectable } from '@nestjs/common';
import { RouteDecisionSchema, AgentState } from './agent.state';

/**
 * Determines which agent handles a user's request.
 * Uses structured LLM output to classify the intent into one of four routes,
 * and extracts a document name if mentioned.
 */
@Injectable()
export class RouterService {
  private routerLlm = new ChatOpenAI({ model: 'gpt-5-mini' });

  route = async (state: typeof AgentState.State) => {
    const structuredLlm =
      this.routerLlm.withStructuredOutput(RouteDecisionSchema);

    const result = await structuredLlm.invoke([
      {
        role: 'system',
        content: `
        You are a router agent. Analyze the user's question and decide which agent should handle it.
        Routes:
        - "retrieve": The user asks a specific question about the content of a document (e.g. "What does chapter 3 say?", "Explain the section about...")
        - "summarize": The user wants a summary of an entire document (e.g. "Summarize the document", "What is the document about?")
        - "getDocument": The user wants the full content of a specific document (e.g. "Show me Kistenlabel.pdf", "Output the content of...")
        - "list": The user asks about their uploaded documents (e.g. "Which documents do I have?", "Show me my uploads")
        If the user mentions a document by name, extract the document name.
        Always respond with the appropriate route.
`,
      },
      { role: 'user', content: state.question },
    ]);

    return { routeDecision: result.route, documentName: result.documentName };
  };

  routeToAgents = (state: typeof AgentState.State): string => {
    switch (state.routeDecision) {
      case 'retrieve':
        return 'retrieve';
      case 'summarize':
        return 'summarize';
      case 'getDocument':
        return 'getDocument';
      case 'list':
        return 'listDocuments';
      default:
        return 'retrieve';
    }
  };
}

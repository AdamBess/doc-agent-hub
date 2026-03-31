import { StateSchema, ReducedValue } from '@langchain/langgraph';
import { z } from 'zod';

/**
 * Shared state passed between all nodes in the LangGraph workflow.
 * Each node can read from and write to this state.
 * `messages` uses a reducer instead of a plain value so that each node
 * appends its response rather than overwriting previous messages.
 */
export const AgentState = new StateSchema({
  question: z.string(),
  documentId: z.number().optional(),
  documentName: z.string().optional(),
  messages: new ReducedValue(
    z.array(z.string()).default(() => []),
    { reducer: (current, update) => current.concat(update) },
  ),
  routeDecision: z
    .enum(['retrieve', 'summarize', 'listDocuments', 'getDocument'])
    .optional(),
});

export const RouteDecisionSchema = z.object({
  route: z.enum(['retrieve', 'summarize', 'listDocuments', 'getDocument']),
  documentName: z.string().default(''),
});

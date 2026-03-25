import { StateSchema, ReducedValue } from '@langchain/langgraph';
import { z } from 'zod';

export const AgentState = new StateSchema({
  question: z.string(),
  documentId: z.string().optional(),
  messages: new ReducedValue(
    z.array(z.string()).default(() => []),
    { reducer: (current, update) => current.concat(update) },
  ),
  routeDecision: z.enum(['retrieve', 'summarize', 'list']).optional(),
});

import { StateSchema, ReducedValue } from '@langchain/langgraph';
import { z } from 'zod';

export const AgentState = new StateSchema({
  question: z.string(),
  documentId: z.number().optional(),
  messages: z.string().optional(),
  routeDecision: z.enum(['retrieve', 'summarize', 'list']).optional(),
});

export const RouteDecisionSchema = z.object({
  route: z.enum(['retrive', 'summarize', 'list']),
});

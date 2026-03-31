import { Injectable } from '@nestjs/common';
import { AgentState } from './agent.state';
import { END, START, StateGraph, MemorySaver } from '@langchain/langgraph';
import { RouterService } from './router.service';
import { AgentService } from './agent.service';

@Injectable()
export class OrchestratorService {
  workflow: ReturnType<OrchestratorService['buildWorkflow']>;

  constructor(
    private routerService: RouterService,
    private agentService: AgentService,
  ) {
    this.workflow = this.buildWorkflow();
  }

  /**
   * Builds the LangGraph StateGraph that orchestrates the multi-agent workflow.
   * Each node is a specialized agent; edges define the execution flow.
   * The route node runs first and uses an LLM to classify the user's intent,
   * then a conditional edge delegates to the appropriate agent.
   * MemorySaver persists conversation history across requests via threadId.
   */
  private buildWorkflow() {
    return new StateGraph(AgentState)
      .addNode('route', this.routerService.route)
      .addNode('retrieve', this.agentService.retrieve)
      .addNode('summarize', this.agentService.summarize)
      .addNode('listDocuments', this.agentService.listDocuments)
      .addNode('getDocument', this.agentService.getDocument)
      .addEdge(START, 'route')
      .addConditionalEdges('route', this.routerService.routeToAgents, [
        'retrieve',
        'summarize',
        'getDocument',
        'listDocuments',
      ])
      .addEdge('retrieve', END)
      .addEdge('summarize', END)
      .addEdge('getDocument', END)
      .addEdge('listDocuments', END)
      .compile({ checkpointer: new MemorySaver() });
  }
}

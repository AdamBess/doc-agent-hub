import { RouterService } from './router.service';

describe('RouterService', () => {
  let service: RouterService;

  beforeEach(() => {
    service = new RouterService();
  });

  describe('routeToAgents', () => {
    it('should route "retrieve" for retrieve decision', () => {
      const state = { routeDecision: 'retrieve' } as any;

      const result = service.routeToAgents(state);

      expect(result).toBe('retrieve');
    });

    it('should route "summarize" for summarize decision', () => {
      const state = { routeDecision: 'summarize' } as any;

      const result = service.routeToAgents(state);

      expect(result).toBe('summarize');
    });

    it('should route "retrieve" for undefined decision', () => {
      const state = { routeDecision: undefined } as any;

      const result = service.routeToAgents(state);

      expect(result).toBe('retrieve');
    });
  });
});

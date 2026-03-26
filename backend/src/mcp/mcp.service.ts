import { Injectable } from '@nestjs/common';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { DocumentsService } from '../documents/documents.service';
import { z } from 'zod';

@Injectable()
export class McpService {
  private server = new McpServer({
    name: 'doc-assistant',
    version: '1.0.0',
  });

  constructor(private documentsService: DocumentsService) {
    this.server.registerTool(
      'listDocuments',
      {
        description: 'List all uploaded documents',
      },
      async () => ({
        content: [
          {
            type: 'text',
            text: JSON.stringify(await this.documentsService.listDocuments()),
          },
        ],
      }),
    );

    this.server.registerTool(
      'searchDocuments',
      {
        description: 'Search documents by semantic similarity',
        inputSchema: { query: z.string() },
      },
      async ({ query }) => {
        const [serialized] = await this.documentsService.searchDocuments(query);
        return { content: [{ type: 'text', text: serialized }] };
      },
    );

    this.server.registerTool(
      'getDocumentInfo',
      {
        description: 'Get metadata of a specific document',
        inputSchema: { documentId: z.number() },
      },
      async ({ documentId }) => {
        const doc = await this.documentsService.getDocumentInfo(documentId);
        return { content: [{ type: 'text', text: JSON.stringify(doc) }] };
      },
    );

    this.server.registerTool(
      'getDocument',
      {
        description: 'Get the specified document',
        inputSchema: { documentId: z.number() },
      },
      async ({ documentId }) => {
        const doc = await this.documentsService.getDocumentChunks(documentId);
        return { content: [{ type: 'text', text: doc }] };
      },
    );
  }

  getServer() {
    return this.server;
  }
}

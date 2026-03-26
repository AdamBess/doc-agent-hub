import { Controller, Post, Get, Delete, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { randomUUID } from 'crypto';
import { McpService } from './mcp.service';

@Controller('mcp')
export class McpController {
  private transport: StreamableHTTPServerTransport;
  constructor(private mcpService: McpService) {}

  async onModuleInit() {
    this.transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
    });
    await this.mcpService.getServer().connect(this.transport);
  }

  @Post()
  async handlePost(@Req() req: Request, @Res() res: Response) {
    await this.transport.handleRequest(req, res, req.body);
  }

  @Get()
  async handleGet(@Req() req: Request, @Res() res: Response) {
    await this.transport.handleRequest(req, res);
  }

  @Delete()
  async handleDelete(@Req() req: Request, @Res() res: Response) {
    await this.transport.handleRequest(req, res);
  }
}

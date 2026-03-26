import { Module } from '@nestjs/common';
import { McpController } from './mcp.controller';
import { McpService } from './mcp.service';
import { DocumentsModule } from 'src/documents/documents.module';

@Module({
  controllers: [McpController],
  providers: [McpService],
  imports: [DocumentsModule],
})
export class McpModule {}

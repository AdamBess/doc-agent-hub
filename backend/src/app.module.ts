import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DocumentsModule } from './documents/documents.module';
import { ChatModule } from './chat/chat.module';
import { Document } from './documents/document.entity';
import { McpModule } from './mcp/mcp.module';

@Module({
  imports: [
    HealthModule,
    ConfigModule.forRoot({ envFilePath: '../.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get('DB_PORT', 5432),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME', 'postgres'),
        entities: [Document],
        synchronize: true,
      }),
    }),
    DocumentsModule,
    ChatModule,
    McpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

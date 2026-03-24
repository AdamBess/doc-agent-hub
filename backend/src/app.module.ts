import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config' 
import { FileUploadController } from './file-upload/file-upload.controller';
import { DocumentsModule } from './documents/documents.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    HealthModule,
    ConfigModule.forRoot({ envFilePath: '../.env' }),
    TypeOrmModule.forRoot({ 
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'postgres',
      entities: [],
      synchronize: true
    }),
    DocumentsModule,
    ChatModule
  ],
  controllers: [AppController, FileUploadController],
  providers: [AppService],
})
export class AppModule {}

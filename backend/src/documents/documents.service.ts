import { Injectable } from '@nestjs/common';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { PGVectorStore } from '@langchain/community/vectorstores/pgvector';
import { OpenAIEmbeddings } from '@langchain/openai';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepo: Repository<Document>,
  ) {}

  private vectorStore: PGVectorStore;

  async onModuleInit() {
    const embeddings = new OpenAIEmbeddings({
      model: 'text-embedding-3-small',
    });
    this.vectorStore = await PGVectorStore.initialize(embeddings, {
      postgresConnectionOptions: {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'postgres',
      },
      tableName: 'documents',
    });
  }

  async processUpload(file: Express.Multer.File) {
    const savedDoc = await this.documentRepo.save({
      filename: file.originalname,
    });
    const docs = await this.loadAndSplitDocument(file, savedDoc.documentId);
    await this.vectorStore.addDocuments(docs);
  }

  private async loadAndSplitDocument(
    file: Express.Multer.File,
    documentId: number,
  ) {
    const loader = new PDFLoader(new Blob([new Uint8Array(file.buffer)]));
    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const allSplits = await splitter.splitDocuments(docs);

    for (const chunk of allSplits) {
      chunk.metadata.documentId = documentId;
    }
    return allSplits;
  }
}

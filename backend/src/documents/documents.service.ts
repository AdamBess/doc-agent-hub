import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { PGVectorStore } from '@langchain/community/vectorstores/pgvector';
import { OpenAIEmbeddings } from '@langchain/openai';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { Document as LangChainDocument } from '@langchain/core/documents';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepo: Repository<Document>,
    private configService: ConfigService,
  ) {}

  private vectorStore: PGVectorStore;

  async onModuleInit() {
    const embeddings = new OpenAIEmbeddings({
      model: 'text-embedding-3-small',
    });
    this.vectorStore = await PGVectorStore.initialize(embeddings, {
      postgresConnectionOptions: {
        type: 'postgres',
        host: this.configService.get('DB_HOST', 'localhost'),
        port: this.configService.get('DB_PORT', 5432),
        user: this.configService.get('DB_USER'),
        password: this.configService.get('DB_PASSWORD'),
        database: this.configService.get('DB_NAME', 'postgres'),
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

  async searchDocuments(query: string): Promise<[string, LangChainDocument[]]> {
    const retrievedDocs = await this.vectorStore.similaritySearch(query, 5);
    const serialized = retrievedDocs
      .map(
        (doc) => `Source: ${doc.metadata.source}\nContent: ${doc.pageContent}`,
      )
      .join('\n');
    return [serialized, retrievedDocs];
  }

  async getDocumentChunks(documentId: number): Promise<string> {
    const results = await this.vectorStore.similaritySearch('', 100, {
      documentId,
    });
    return results.map((doc) => doc.pageContent).join('\n');
  }

  async listDocuments() {
    return this.documentRepo.find();
  }

  async getDocumentInfo(documentId: number) {
    return this.documentRepo.findOneBy({ documentId });
  }

  async findByFilename(filename: string) {
    return this.documentRepo.findOneBy({ filename });
  }
}

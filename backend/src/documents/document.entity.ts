import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  documentId: number;

  @Column()
  filename: string;

  @CreateDateColumn()
  uploadedAt: Date;
}

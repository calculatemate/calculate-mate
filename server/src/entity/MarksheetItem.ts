import { Entity, ObjectIdColumn, ObjectID, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Min, Max } from 'class-validator';

@Entity()
@Unique(['id'])
export class MarksheetItem {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  marksheetId: string;

  @Column()
  name: string;

  @Column()
  @Min(0)
  @Max(100)
  value: number;

  @Column()
  @Min(0)
  @Max(100)
  percent: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}

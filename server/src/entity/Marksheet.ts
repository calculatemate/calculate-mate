import { Entity, ObjectIdColumn, ObjectID, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Length } from 'class-validator';

@Entity()
@Unique(['id'])
export class Marksheet {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  userId: string;

  @Column()
  @Length(2, 100)
  name: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}

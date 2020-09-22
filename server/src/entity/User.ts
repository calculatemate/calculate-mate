import { Entity, ObjectIdColumn, ObjectID, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Length, IsNotEmpty, IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username'])
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @IsEmail()
  username: string;

  @Column()
  @Length(4, 100)
  password: string;

  @Column()
  @Length(2, 100)
  firstName: string;

  @Column()
  @Length(2, 100)
  lastName: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}

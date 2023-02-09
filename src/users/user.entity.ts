import { Entity, Column, PrimaryColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserInterface } from './interfaces/user';

@Entity()
export class User implements UserInterface {
  @PrimaryColumn()
  id: string;

  @Column()
  login: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  version: number;

  @BeforeInsert()
  setVersion() {
    this.version = 1;
  }

  @BeforeUpdate()
  updateVersion() {
    this.version = this.version + 1;
  }

  @Column({ type: 'bigint' })
  createdAt: number;

  @BeforeInsert()
  updateCreatedAt() {
    this.createdAt = Date.now();
  }

  @Column({ type: 'bigint' })
  updatedAt: number;

  @BeforeInsert()
  @BeforeUpdate()
  updateUpdatedAt() {
    this.updatedAt = Date.now();
  }
}

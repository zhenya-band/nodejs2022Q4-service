import { Entity, Column, PrimaryColumn } from 'typeorm';
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

  @Column({ type: 'bigint' })
  createdAt: number;

  @Column({ type: 'bigint' })
  updatedAt: number;
}

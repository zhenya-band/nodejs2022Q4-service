import { Entity, Column, PrimaryColumn, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserInterface } from './interfaces/user';

const DateTransformer = {
  transformer: {
    to: (value: Date) => value,
    from: (value: Date) => value.getTime(),
  },
};

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

  @CreateDateColumn(DateTransformer)
  createdAt: number;

  @UpdateDateColumn(DateTransformer)
  updatedAt: number;

  @Column({ nullable: true })
  refreshToken: string;
}

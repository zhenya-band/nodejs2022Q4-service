import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ArtistInterface } from './interfaces/artist';

@Entity()
export class Artist implements ArtistInterface {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}

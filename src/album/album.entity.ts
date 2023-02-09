import { Artist } from './../artist/artist.entity';
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';

@Entity()
export class Album {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    nullable: true,
  })
  artist: Artist | null;
}

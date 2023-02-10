import { Artist } from './../artist/artist.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { Track } from 'src/track/track.entity';

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

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];
}

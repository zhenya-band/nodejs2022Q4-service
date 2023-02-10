import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { TrackInterface } from './interfaces/track';
import { Artist } from 'src/artist/artist.entity';
import { Album } from 'src/album/album.entity';

@Entity()
export class Track implements TrackInterface {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    nullable: true,
  })
  artist: Artist | null;

  @Column({ nullable: true })
  albumId: string | null;

  @ManyToOne(() => Album, (album) => album.tracks, {
    nullable: true,
  })
  album: Album | null;

  @Column()
  duration: number;
}

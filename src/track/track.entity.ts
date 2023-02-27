import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Artist } from 'src/artist/artist.entity';
import { Album } from 'src/album/album.entity';
import { Favs } from 'src/favs/favs.entity';

@Entity()
export class Track {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: Artist | null;

  @Column({ nullable: true })
  albumId: string | null;

  @ManyToOne(() => Album, (album) => album.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  album: Album | null;

  @Column()
  duration: number;

  @ManyToOne(() => Favs, (favorites) => favorites.artists)
  favorites: Favs;
}

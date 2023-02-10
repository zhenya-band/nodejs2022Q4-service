import { Album } from 'src/album/album.entity';
import { Artist } from 'src/artist/artist.entity';
import { Track } from 'src/track/track.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favs')
export class Favs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Artist, (artist) => artist.favorites, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  artists: Artist[];

  @OneToMany(() => Album, (album) => album.favorites, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  albums: Album[];

  @OneToMany(() => Track, (track) => track.favorites, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  tracks: Track[];
}

import { Track } from './../track/track.entity';
import { Album } from 'src/album/album.entity';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { Favs } from 'src/favs/favs.entity';

@Entity()
export class Artist {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];

  @ManyToOne(() => Favs, (favorites) => favorites.artists)
  favorites: Favs;
}

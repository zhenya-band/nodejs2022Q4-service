import { Injectable, Inject, forwardRef, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { Repository } from 'typeorm';
import { MESSAGES } from './const/messages';
import { Favs } from './favs.entity';
import { FavoritesResponse } from './interfaces/FavoritesRepsonse';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(Favs)
    private favsRepository: Repository<Favs>,

    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,

    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,

    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
  ) {}

  async getAll(): Promise<FavoritesResponse> {
    const favs = await this.favsRepository.find({
      relations: { artists: true, albums: true, tracks: true },
    });

    if (favs.length) {
      return favs[0];
    }

    return { artists: [], albums: [], tracks: [] };
  }

  async addTrack(trackId: string): Promise<string> {
    const track = await this.trackService.getCandidate(trackId);
    if (!track) {
      throw new UnprocessableEntityException(`track with id = ${trackId} not exists`);
    }

    const favs = await this.getAll();
    favs.tracks = favs.tracks.concat(track);
    await this.favsRepository.save(favs);

    return MESSAGES.TRACK_SAVED;
  }

  async deleteTrack(trackId: string): Promise<string> {
    const favs = await this.getAll();
    const trackForDeleteIndex = favs.tracks.findIndex((track) => track.id === trackId);
    if (trackForDeleteIndex === -1) {
      throw new UnprocessableEntityException(`track with id = ${trackId} not exists`);
    }

    favs.tracks.splice(trackForDeleteIndex, 1);
    await this.favsRepository.save(favs);
    return MESSAGES.TRACK_DELETED;
  }

  async addAlbum(albumId: string): Promise<string> {
    const album = await this.albumService.getCandidate(albumId);
    if (!album) {
      throw new UnprocessableEntityException(`album with id = ${albumId} not exists`);
    }

    const favs = await this.getAll();
    favs.albums = favs.albums.concat(album);
    await this.favsRepository.save(favs);

    return MESSAGES.ALBUM_SAVED;
  }

  async deleteAlbum(albumId: string): Promise<string> {
    const favs = await this.getAll();
    const albumForDeleteIndex = favs.albums.findIndex((album) => album.id === albumId);
    if (albumForDeleteIndex === -1) {
      throw new UnprocessableEntityException(`album with id = ${albumId} not exists`);
    }

    favs.albums.splice(albumForDeleteIndex, 1);
    await this.favsRepository.save(favs);
    return MESSAGES.ALBUM_DELETED;
  }

  async addArtist(artistId: string): Promise<string> {
    const artist = await this.artistService.getCandidate(artistId);
    if (!artist) {
      throw new UnprocessableEntityException();
    }

    const favs = await this.getAll();
    favs.artists = favs.artists.concat(artist);
    await this.favsRepository.save(favs);

    return MESSAGES.ARTIST_SAVED;
  }

  async deleteArtist(artistId: string): Promise<string> {
    const favs = await this.getAll();
    const artistForDeleteIndex = favs.artists.findIndex((artist) => artist.id === artistId);
    if (artistForDeleteIndex === -1) {
      throw new UnprocessableEntityException(`artist with id = ${artistId} not exists`);
    }

    favs.artists.splice(artistForDeleteIndex, 1);
    await this.favsRepository.save(favs);
    return MESSAGES.ARTIST_DELETED;
  }
}

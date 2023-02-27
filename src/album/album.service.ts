import { CreateAlbumDto } from './dto/CreateAlbumDto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './album.entity';
import { AlbumInterface } from './interfaces/album';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundExceptionWithMessage } from 'src/exceptions/NorFound.exeption';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async create({ artistId, name, year }: CreateAlbumDto): Promise<AlbumInterface> {
    const album = new Album();
    album.id = uuidv4();
    album.name = name;
    album.year = year;
    album.artistId = artistId;

    return await this.albumRepository.save(album);
  }

  async getAll(): Promise<AlbumInterface[]> {
    return await this.albumRepository.find();
  }

  async getCandidate(id: string): Promise<Album> {
    return await this.albumRepository.findOneBy({ id });
  }

  async getById(id: string): Promise<Album> {
    const album = await this.getCandidate(id);
    if (!album) {
      throw new NotFoundExceptionWithMessage(id);
    }

    return album;
  }

  async update(id: string, { artistId, name, year }: CreateAlbumDto): Promise<AlbumInterface> {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundExceptionWithMessage(id);
    }

    album.name = name;
    album.year = year;
    album.artistId = artistId;

    return await this.albumRepository.save(album);
  }

  async delete(id: string): Promise<void> {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundExceptionWithMessage(id);
    }

    await this.albumRepository.delete(id);
  }
}

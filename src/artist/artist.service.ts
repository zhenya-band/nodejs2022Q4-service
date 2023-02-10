import { CreateArtistDto } from './dto/CreateArtistDto';
import { Injectable } from '@nestjs/common';
import { ArtistInterface } from './interfaces/artist';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { NotFoundExceptionWithMessage } from 'src/exceptions/NorFound.exeption';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create({ name, grammy }: CreateArtistDto): Promise<ArtistInterface> {
    const artist = new Artist();
    artist.id = uuidv4();
    artist.name = name;
    artist.grammy = grammy;

    return await this.artistRepository.save(artist);
  }

  async getAll(): Promise<ArtistInterface[]> {
    return await this.artistRepository.find();
  }

  async getById(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundExceptionWithMessage(id);
    }

    return artist;
  }

  async update(id: string, { name, grammy }: CreateArtistDto): Promise<ArtistInterface> {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundExceptionWithMessage(id);
    }

    artist.name = name;
    artist.grammy = grammy;

    return await this.artistRepository.save(artist);
  }

  async delete(id: string): Promise<void> {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundExceptionWithMessage(id);
    }

    await this.artistRepository.delete(id);
  }
}

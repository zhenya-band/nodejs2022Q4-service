import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundExceptionWithMessage } from 'src/exceptions/NorFound.exeption';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/CreateTrackDto';
import { TrackInterface } from './interfaces/track';
import { Track } from './track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async getAll(): Promise<TrackInterface[]> {
    return await this.trackRepository.find();
  }

  async getById(id: string): Promise<Track> {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundExceptionWithMessage(id);
    }

    return track;
  }

  async create({ name, albumId, artistId, duration }: CreateTrackDto): Promise<TrackInterface> {
    const track = new Track();
    track.name = name;
    track.albumId = albumId;
    track.artistId = artistId;
    track.duration = duration;

    return await this.trackRepository.save(track);
  }

  async update(id: string, { name, albumId, artistId, duration }: CreateTrackDto): Promise<TrackInterface> {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundExceptionWithMessage(id);
    }

    track.name = name;
    track.albumId = albumId;
    track.artistId = artistId;
    track.duration = duration;

    return await this.trackRepository.save(track);
  }

  async delete(id: string): Promise<void> {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundExceptionWithMessage(id);
    }

    await this.trackRepository.delete(id);
  }
}

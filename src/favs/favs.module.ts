import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { FavsController } from './favs.controller';
import { Favs } from './favs.entity';
import { FavsService } from './favs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favs]),
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
  ],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}

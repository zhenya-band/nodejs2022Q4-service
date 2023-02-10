import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackController } from './track.controller';
import { Track } from './track.entity';
import { TrackService } from './track.service';

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}

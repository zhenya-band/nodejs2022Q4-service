import { Controller, Get, Param, UsePipes, Post, Put, Delete, Body, HttpCode } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { GetByIdDto } from 'src/common/dto/GetByIdDto';
import { CreateTrackDto } from './dto/CreateTrackDto';
import { TrackInterface } from './interfaces/track';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get('/')
  async getAll(): Promise<TrackInterface[]> {
    return await this.trackService.getAll();
  }

  @UsePipes(ValidationPipe)
  @Get(':id')
  async getById(@Param() { id }: GetByIdDto): Promise<TrackInterface> {
    return await this.trackService.getById(id);
  }

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createTrackDto: CreateTrackDto): Promise<TrackInterface> {
    return await this.trackService.create(createTrackDto);
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(@Param() { id }: GetByIdDto, @Body() updateTrackDto: CreateTrackDto): Promise<TrackInterface> {
    return await this.trackService.update(id, updateTrackDto);
  }

  @UsePipes(ValidationPipe)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() { id }: GetByIdDto): Promise<void> {
    return await this.trackService.delete(id);
  }
}

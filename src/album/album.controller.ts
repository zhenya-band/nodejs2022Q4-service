import { Controller, Get, UsePipes, Post, Body, Param, Put, Delete, HttpCode } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { GetByIdDto } from 'src/common/dto/GetByIdDto';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/CreateAlbumDto';
import { AlbumInterface } from './interfaces/album';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() albumDto: CreateAlbumDto): Promise<AlbumInterface> {
    return await this.albumService.create(albumDto);
  }

  @Get('/')
  async getAll(): Promise<AlbumInterface[]> {
    return await this.albumService.getAll();
  }

  @UsePipes(ValidationPipe)
  @Get(':id')
  async getById(@Param() { id }: GetByIdDto): Promise<AlbumInterface> {
    return await this.albumService.getById(id);
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(@Param() { id }: GetByIdDto, @Body() albumDto: CreateAlbumDto): Promise<AlbumInterface> {
    return await this.albumService.update(id, albumDto);
  }

  @UsePipes(ValidationPipe)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() { id }: GetByIdDto): Promise<void> {
    return await this.albumService.delete(id);
  }
}

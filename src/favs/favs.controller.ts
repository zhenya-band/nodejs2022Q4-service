import { Controller, Get, Post, Param, UsePipes, Delete, HttpCode } from '@nestjs/common';
import { GetByIdDto } from 'src/common/dto/GetByIdDto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { FavsService } from './favs.service';
import { FavoritesResponse } from './interfaces/FavoritesRepsonse';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get('/')
  async getAllFavs(): Promise<FavoritesResponse> {
    return await this.favsService.getAll();
  }

  @UsePipes(ValidationPipe)
  @Post('track/:id')
  async addTrack(@Param() { id }: GetByIdDto) {
    return await this.favsService.addTrack(id);
  }

  @UsePipes(ValidationPipe)
  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param() { id }: GetByIdDto) {
    return await this.favsService.deleteTrack(id);
  }

  @UsePipes(ValidationPipe)
  @Post('album/:id')
  async addAlbum(@Param() { id }: GetByIdDto) {
    return await this.favsService.addAlbum(id);
  }

  @UsePipes(ValidationPipe)
  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param() { id }: GetByIdDto) {
    return await this.favsService.deleteAlbum(id);
  }

  @UsePipes(ValidationPipe)
  @Post('artist/:id')
  async addArtist(@Param() { id }: GetByIdDto) {
    return await this.favsService.addArtist(id);
  }

  @UsePipes(ValidationPipe)
  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param() { id }: GetByIdDto) {
    return await this.favsService.deleteArtist(id);
  }
}

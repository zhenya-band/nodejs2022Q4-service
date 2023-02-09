import { Body, Controller, Get, Post, Put, Param, UsePipes, Delete, HttpCode } from '@nestjs/common';
import { GetByIdDto } from 'src/common/dto/GetByIdDto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/CreateArtistDto';
import { ArtistInterface } from './interfaces/artist';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() artistDto: CreateArtistDto): Promise<ArtistInterface> {
    return await this.artistService.create(artistDto);
  }

  @Get('/')
  async getAll(): Promise<ArtistInterface[]> {
    return await this.artistService.getAll();
  }

  @UsePipes(ValidationPipe)
  @Get(':id')
  async getById(@Param() { id }: GetByIdDto): Promise<ArtistInterface> {
    return await this.artistService.getById(id);
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(@Param() { id }: GetByIdDto, @Body() artistDto: CreateArtistDto): Promise<ArtistInterface> {
    return await this.artistService.update(id, artistDto);
  }

  @UsePipes(ValidationPipe)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() { id }: GetByIdDto): Promise<void> {
    return await this.artistService.delete(id);
  }
}

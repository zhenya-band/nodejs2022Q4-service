import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  year: number;

  @IsUUID('4')
  artistId: string;
}

import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID('4')
  artistId: string;

  @IsUUID('4')
  albumId: string;

  @IsNumber()
  duration: number;
}

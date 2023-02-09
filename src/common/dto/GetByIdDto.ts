import { IsUUID } from 'class-validator';

export class GetByIdDto {
  @IsUUID('4')
  id: string;
}

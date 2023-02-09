import { NotFoundException } from '@nestjs/common/exceptions';

export class NotFoundExceptionWithMessage extends NotFoundException {
  constructor(id: string) {
    super(`Record with id = ${id} not found`);
  }
}

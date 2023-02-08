import { NotFoundException } from '@nestjs/common/exceptions';

export class UserNotFoundException extends NotFoundException {
  constructor(userId: string) {
    super(`User with id = ${userId} not found`);
  }
}

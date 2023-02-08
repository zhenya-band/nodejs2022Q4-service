import { HttpException, HttpStatus } from '@nestjs/common';

export class UserOldPasswordWrongException extends HttpException {
  constructor() {
    super(`Old password is wrong`, HttpStatus.FORBIDDEN);
  }
}

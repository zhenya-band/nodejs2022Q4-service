import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { generateValidationErrorsMessages } from 'src/common/generateValidationErrorsMessages';
import { ValidationException } from 'src/exceptions/validation.exception';
import { LoginDto } from '../dto/LoginDto';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  // constructor(@Inject('OBJ_TO_VALIDATE') private objToValidate: object) {}
  objToValidate: object;

  constructor() {
    this.objToValidate = new LoginDto();
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    Object.keys(body).forEach((key) => {
      this.objToValidate[key] = body[key];
    });

    const errors = await validate(this.objToValidate, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const errorsMessages = generateValidationErrorsMessages(errors);
      throw new ValidationException(errorsMessages);
    }

    next();
  }
}

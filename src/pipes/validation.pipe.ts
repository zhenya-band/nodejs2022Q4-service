import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ValidationException } from 'src/exceptions/validation.exception';
import { generateValidationErrorsMessages } from 'src/common/generateValidationErrorsMessages';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const object = plainToInstance(metatype, value);
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const errorsMessages = generateValidationErrorsMessages(errors);
      throw new ValidationException(errorsMessages);
    }

    return value;
  }
}

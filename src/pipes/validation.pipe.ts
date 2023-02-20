import { PipeTransform, Injectable, ArgumentMetadata, ValidationError } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const object = plainToInstance(metatype, value);
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const errorsMessages = this.generateErrorsMessages(errors);
      throw new ValidationException(errorsMessages);
    }

    return value;
  }

  private generateErrorsMessages(errors: ValidationError[]) {
    return errors.map((err) => `${err.property} - ${Object.values(err.constraints).join(', ')}`);
  }
}

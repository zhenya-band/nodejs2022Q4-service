import { ValidationError } from 'class-validator';

export const generateValidationErrorsMessages = (errors: ValidationError[]): string[] => {
  return errors.map((err) => `${err.property} - ${Object.values(err.constraints).join(', ')}`);
};

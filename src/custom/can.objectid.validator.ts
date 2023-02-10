import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { isValidObjectId } from 'mongoose';

@ValidatorConstraint({ async: true })
export class MongoObjectIdValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return isValidObjectId(value);
  }
}

/**
 * Validates that the given value can be casted onto a MongoDB ObjectId.
 */
export function CanBeObjectId(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: 'The given value is not a valid MongoDB ObjectId.',
        ...validationOptions,
      },
      constraints: [],
      validator: MongoObjectIdValidator,
    });
  };
}

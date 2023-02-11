import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types, isValidObjectId } from 'mongoose';

@Injectable()
/**
 * Parses a parameter to check if it is a valid MongoDB ObjectId.
 */
export class ParseObjectIdPipe
  implements PipeTransform<string, Types.ObjectId>
{
  /** Optional. Marks this parameters as required. */
  #required: boolean;

  constructor(required = true) {
    this.#required = required;
  }

  transform(value: string): Types.ObjectId {
    if (!value || !value?.length) {
      if (!this.#required) return null;
      throw new BadRequestException('You must provide a MongoDB ObjectId.');
    }

    if (!isValidObjectId(value))
      throw new BadRequestException(
        'The given value is not a valid MongoDB ObjectId.',
      );

    return new Types.ObjectId(value);
  }
}

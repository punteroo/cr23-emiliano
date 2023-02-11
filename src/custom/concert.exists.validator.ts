import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Model } from 'mongoose';
import { Concert } from 'src/modules/concert/concert.model';

@ValidatorConstraint({ name: ConcertExists.name, async: true })
@Injectable()
/**
 * Custom validator constraint that validates a provided Document ObjectId referencing a concert exists.
 */
export class ConcertExists implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(Concert.name)
    private readonly repo: Model<Concert>,
  ) {}

  async validate(value: string): Promise<boolean> {
    const concert = await this.repo.findById(value);

    return concert !== undefined || concert !== null;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `This concert does not exist.`;
  }
}

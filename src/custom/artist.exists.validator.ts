import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';
import { Artist } from 'src/modules/artist/artist.model';

@ValidatorConstraint({ name: ArtistExists.name, async: true })
@Injectable()
/**
 * Custom validator constraint that validates a provided Document ObjectId referencing an artist exists.
 */
export class ArtistExists implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(Artist.name)
    private readonly repo: Model<Artist>,
  ) {}

  async validate(value: string): Promise<boolean> {
    const artist = await this.repo.findById(value);

    return artist !== undefined || artist !== null;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `An artist with the given ID does not exist.`;
  }
}

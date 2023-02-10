import { Injectable, Logger } from '@nestjs/common';
import { Model, isValidObjectId } from 'mongoose';
import { Artist } from './artist.model';
import { IArtistService } from './artist.interface';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class ArtistService implements IArtistService {
  readonly #logger: Logger = new Logger(ArtistService.name);

  constructor(private readonly repo: Model<Artist>) {}

  async fetchArtists(): Promise<Artist[]> {
    return await this.repo.find({});
  }

  async fetchArtist(name: string, id?: string): Promise<Artist> {
    try {
      // Fetch the artist with this name.
      const artist = await this.repo.findOne({
        $or: [{ name }, { _id: isValidObjectId(id) ? id : null }],
      });

      return artist;
    } catch (e) {
      this.#logger.error(`Failed to fetch artist with name ${name}.`);
      throw new NotFoundException(
        `Could not find artist with ${id ? `ID ${id}` : `name ${name}`}.`,
      );
    }
  }
}

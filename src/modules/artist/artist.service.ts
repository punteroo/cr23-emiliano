import { Injectable, Logger } from '@nestjs/common';
import { Model, Types, isValidObjectId } from 'mongoose';
import { Artist } from './artist.model';
import { IArtistService } from './artist.interface';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ArtistService implements IArtistService {
  readonly #logger: Logger = new Logger(ArtistService.name);

  constructor(@InjectModel(Artist.name) private readonly repo: Model<Artist>) {}

  async fetchArtists(): Promise<Artist[]> {
    return await this.repo.find({});
  }

  async fetchArtist(name: string, id?: Types.ObjectId): Promise<Artist> {
    try {
      // Fetch the artist with this name.
      const artist = await this.repo.findOne({
        $or: [
          { name: { $regex: `${name}`, $options: 'i' } },
          { _id: isValidObjectId(id) ? id : null },
        ],
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

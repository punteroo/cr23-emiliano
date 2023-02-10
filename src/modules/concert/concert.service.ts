import { Injectable, Logger } from '@nestjs/common';
import { IConcertService } from './concert.interface';
import { Concert, ConcertScenario } from './concert.model';
import { Model } from 'mongoose';
import { InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ConcertService implements IConcertService {
  readonly #logger: Logger = new Logger(ConcertService.name);

  constructor(
    @InjectModel(Concert.name) private readonly repo: Model<Concert>,
  ) {}

  async fetchAllConcerts(): Promise<Concert[]> {
    try {
      return await this.repo.find({});
    } catch (e) {
      this.#logger.error(`Failed to fetch all concerts: ${e}`);
      throw new InternalServerErrorException(e);
    }
  }

  async fetchConcertById(id: string): Promise<Concert> {
    try {
      return await this.repo.findById(id);
    } catch (e) {
      this.#logger.error(`Failed to fetch concert with ID ${id}: ${e}`);
      throw new InternalServerErrorException(e);
    }
  }

  async fetchConcertsByArtist(artistId: string): Promise<Concert[]> {
    try {
      return await this.repo.find({ artist: artistId });
    } catch (e) {
      this.#logger.error(
        `Failed to fetch concerts by artist ID ${artistId}: ${e}`,
      );
      throw new InternalServerErrorException(e);
    }
  }

  async fetchConcertsByVenue(scenario: ConcertScenario): Promise<Concert[]> {
    try {
      return await this.repo.find({ scenario });
    } catch (e) {
      this.#logger.error(`Failed to fetch concerts by venue ${scenario}: ${e}`);
      throw new InternalServerErrorException(e);
    }
  }

  async fetchConcertsByTimeRange(start: Date, end: Date): Promise<Concert[]> {
    try {
      return await this.repo.find({
        startsAt: { $gte: start, $lte: end },
        endsAt: { $gte: start, $lte: end },
      });
    } catch (e) {
      this.#logger.error(
        `Failed to fetch concerts by time range ${start.toISOString()} - ${end.toISOString()}: ${e}`,
      );
      throw new InternalServerErrorException(e);
    }
  }
}

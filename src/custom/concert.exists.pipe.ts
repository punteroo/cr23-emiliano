import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
import { ConcertService } from 'src/modules/concert/concert.service';

@Injectable()
export class ConcertExistsPipe
  implements PipeTransform<Types.ObjectId, Promise<Types.ObjectId>>
{
  constructor(private readonly service: ConcertService) {}

  /** NOTE: This pipe should be used side-to-side with ParseObjectIdPipe to ensure the value being sent IS a valid ObjectId. */
  async transform(value: Types.ObjectId): Promise<Types.ObjectId> {
    // Fetch a concert with this ID.
    const concert = await this.service.fetchConcertById(value);

    if (!concert)
      throw new NotFoundException(`Concert with ID ${value} doesn't exist.`);

    return value;
  }
}

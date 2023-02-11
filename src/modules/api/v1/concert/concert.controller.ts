import { BadRequestException, Get, Param, Query } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ParseISODatePipe } from 'src/custom/isodate.pipe';
import { ParseObjectIdPipe } from 'src/custom/objectid.pipe';
import { Concert } from 'src/modules/concert/concert.model';
import { ConcertService } from 'src/modules/concert/concert.service';

@Controller('/api/v1/concerts')
export class ConcertController {
  constructor(private readonly service: ConcertService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getConcerts(
    @Query('start', ParseISODatePipe) start?: Date,
    @Query('end', ParseISODatePipe) end?: Date,
  ): Promise<Concert[]> {
    if (start && end) {
      if (start > end)
        throw new BadRequestException(
          `'start' date cannot be after 'end' date.`,
        );

      return await this.service.fetchConcertsByTimeRange(start, end);
    }

    return await this.service.fetchAllConcerts();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getConcertById(
    @Param('id', new ParseObjectIdPipe()) id: Types.ObjectId,
  ): Promise<Concert> {
    return await this.service.fetchConcertById(id);
  }

  @Get('/artist/:id')
  @UseGuards(JwtAuthGuard)
  async getConcertsByArtist(
    @Param('id', new ParseObjectIdPipe()) id: Types.ObjectId,
  ): Promise<Concert[]> {
    return await this.service.fetchConcertsByArtist(id);
  }

  @Get('/venue/:scenario')
  @UseGuards(JwtAuthGuard)
  async getConcertsByVenue(
    @Param('scenario') scenario: Concert['scenario'],
  ): Promise<Concert[]> {
    return await this.service.fetchConcertsByVenue(scenario);
  }
}

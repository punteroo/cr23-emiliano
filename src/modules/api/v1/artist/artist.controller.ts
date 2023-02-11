import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ParseObjectIdPipe } from 'src/custom/objectid.pipe';
import { Artist } from 'src/modules/artist/artist.model';
import { ArtistService } from 'src/modules/artist/artist.service';

@Controller('/api/v1/artists')
export class ArtistController {
  constructor(private readonly service: ArtistService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getArtists(@Query('name') name?: string): Promise<Artist | Artist[]> {
    if (name) return await this.service.fetchArtist(name);

    return await this.service.fetchArtists();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getArtistById(
    @Param('id', new ParseObjectIdPipe()) id: Types.ObjectId,
  ) {
    return await this.service.fetchArtist(null, id);
  }
}

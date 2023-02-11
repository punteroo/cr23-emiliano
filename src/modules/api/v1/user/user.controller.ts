import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ParseBoolPipe } from '@nestjs/common/pipes';
import { Request } from 'express';
import { JwtAdminGuard } from 'src/auth/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ConcertExistsPipe } from 'src/custom/concert.exists.pipe';
import { ParseObjectIdPipe } from 'src/custom/objectid.pipe';
import { UserDto } from 'src/dto/user.dto';
import { UserPreference } from 'src/modules/user/user.preference.model';
import { UserService } from 'src/modules/user/user.service';

@Controller(`api/v1/users`)
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard, JwtAdminGuard)
  async getUsers(@Query('id') id?: string): Promise<UserDto[] | UserDto> {
    if (id) return this.service.getUserById(id);

    return this.service.getUsers();
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: Request): Promise<UserDto> {
    return req?.user as UserDto;
  }

  @Get('/me/concerts')
  @UseGuards(JwtAuthGuard)
  async getMyConcerts(@Req() req: Request): Promise<UserPreference[]> {
    const user = req.user as UserDto;

    const userDoc = await this.service.getUserById(user._id);

    return userDoc.preferences;
  }

  @Post('/me/concerts/:id/:state')
  @UseGuards(JwtAuthGuard)
  async addOrRemoveMyConcerts(
    @Req() req: Request,
    @Param('id', new ParseObjectIdPipe(), ConcertExistsPipe)
    concertId: string,
    @Param('state', ParseBoolPipe) state: boolean,
  ): Promise<UserDto> {
    const user = req.user as UserDto;

    return await this.service.setConcertPreference(user._id, concertId, state);
  }
}

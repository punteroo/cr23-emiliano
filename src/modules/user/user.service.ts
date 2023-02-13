import { Injectable, Logger } from '@nestjs/common';
import { Model, Types, isValidObjectId } from 'mongoose';
import { User } from './user.model';
import { IUserService } from './user.interface';
import { UserRegisterDto } from 'src/dto/user.register.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from 'src/dto/user.dto';
import { UserPreference } from './user.preference.model';
import { EventAttributes, createEvents } from 'ics';

@Injectable()
export class UserService implements IUserService {
  readonly #logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private readonly repo: Model<User>,
    @InjectModel(UserPreference.name)
    private readonly preferences: Model<UserPreference>,
  ) {}

  async getUsers(): Promise<UserDto[]> {
    try {
      return await this.repo.find({});
    } catch (e) {
      this.#logger.error(`Failed to fetch users: ${e}`);
      throw new InternalServerErrorException(e);
    }
  }

  async getUserById(id: string): Promise<UserDto> {
    try {
      // Fetch the user.
      const user = await this.repo.findOne({
        $or: [{ id }, { _id: isValidObjectId(id) ? id : null }],
      });

      if (!user) return null;

      // Find the user's preferences.
      const preferences = await this.preferences
        .find({ user: user._id })
        .populate({
          path: 'concert',
          populate: {
            path: 'artist',
          },
        });

      return {
        ...user.toJSON(),
        preferences,
      } as UserDto;
    } catch (e) {
      this.#logger.error(`Failed to fetch user with ID ${id}: ${e}`);
      throw new InternalServerErrorException(e);
    }
  }

  async registerUser(user: UserRegisterDto): Promise<UserDto> {
    try {
      // Register the Google user into Mongo.
      const newUser = new this.repo(user);

      // Return the newly created document.
      return (await newUser.save()).toJSON() as UserDto;
    } catch (e) {
      this.#logger.error(`Failed to register user: ${e}`);
      throw new InternalServerErrorException(e);
    }
  }

  async setConcertPreference(
    userId: string,
    concertId: string,
    preferred: boolean,
  ): Promise<UserDto> {
    try {
      // Find an existing preference (if exists)
      const preference = await this.preferences.findOne({
        user: userId,
        concert: new Types.ObjectId(concertId),
      });

      // If the preference exists, update it.
      if (preference) {
        preference.preferred = preferred;
        preference.markModified('preferred');

        await preference.save();
      } else {
        // Otherwise, create a new preference.
        const newPreference = new this.preferences({
          user: userId,
          concert: new Types.ObjectId(concertId),
          preferred,
        });

        await newPreference.save();
      }

      // Fetch the user and return it.
      return await this.getUserById(userId);
    } catch (e) {
      this.#logger.error(
        `Failed to set concert ${concertId} preference on ${userId}: ${e}`,
      );
      throw new InternalServerErrorException(e);
    }
  }

  async generateCalendar(id: Types.ObjectId): Promise<string> {
    // Fetch this user's preferences.
    try {
      const preferences = await this.preferences
        .find({
          user: id,
          preferred: true,
        })
        .populate({
          path: 'concert',
          populate: {
            path: 'artist',
          },
        })
        .populate('user');

      // Map all preferences to an array of events.
      const events: EventAttributes[] = preferences.map((p) => {
        return {
          start: [
            p.concert.startsAt.getUTCFullYear(),
            p.concert.startsAt.getUTCMonth() + 1,
            p.concert.startsAt.getUTCDate(),
            p.concert.startsAt.getUTCHours(),
            p.concert.startsAt.getUTCMinutes(),
          ],
          startInputType: 'utc',
          duration: {
            hours:
              p.concert.endsAt.getUTCHours() -
                p.concert.startsAt.getUTCHours() ?? 0,
            minutes:
              p.concert.endsAt.getUTCMinutes() -
              p.concert.startsAt.getUTCMinutes(),
          },
          title: p.concert.artist.name,
          description: `Escenario ${p.concert.scenario}`,
          organizer: {
            name: `Cosquín Rock ${p.concert.startsAt.getFullYear()}`,
            email: 'info@edenentradas.com.ar',
          },
          status: 'CONFIRMED',
          attendees: [{ name: p.user.name, email: p.user.email }],
        };
      });

      // Generate the calendar.
      const { error, value: calendar } = createEvents(events);

      if (error) throw error;

      return calendar;
    } catch (e) {
      this.#logger.error(`Failed to generate calendar for user ${id}: ${e}`);
      throw new InternalServerErrorException(e);
    }
  }
}

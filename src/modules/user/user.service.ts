import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.model';
import { IUserService } from './user.interface';
import { UserRegisterDto } from 'src/dto/user.register.dto';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class UserService implements IUserService {
  readonly #logger: Logger = new Logger(UserService.name);

  constructor(private readonly repo: Model<User>) {}

  async getUserById(id: string): Promise<User> {
    try {
      return await this.repo.findOne({ id });
    } catch (e) {
      this.#logger.error(`Failed to fetch user with ID ${id}: ${e}`);
      throw new InternalServerErrorException(e);
    }
  }

  async registerUser(user: UserRegisterDto): Promise<User> {
    try {
      // Register the Google user into Mongo.
      const newUser = new this.repo(user);

      // Return the newly created document.
      return await newUser.save();
    } catch (e) {
      this.#logger.error(`Failed to register user: ${e}`);
      throw new InternalServerErrorException(e);
    }
  }
}

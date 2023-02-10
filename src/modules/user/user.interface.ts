import { UserRegisterDto } from 'src/dto/user.register.dto';
import { User } from './user.model';

export interface IUserService {
  /**
   * Fetches a user by its Google OAuth ID.
   *
   * @param {string} id The Google OAuth ID.
   *
   * @returns {Promise<User>} The user.
   */
  getUserById(id: string): Promise<User>;

  /**
   * Registers a new user into the database.
   *
   * @param {UserRegisterDto} user The user to register.
   *
   * @returns {Promise<User>} The registered user.
   */
  registerUser(user: UserRegisterDto): Promise<User>;
}

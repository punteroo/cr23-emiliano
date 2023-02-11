import { UserRegisterDto } from 'src/dto/user.register.dto';
import { UserDto } from 'src/dto/user.dto';

export interface IUserService {
  /**
   * Fetches all registered users in the platform.
   *
   * @noparams
   * @returns {Promise<UserDto[]>} The users and their preferences.
   */
  getUsers(): Promise<UserDto[]>;

  /**
   * Fetches a user by its Google OAuth ID.
   *
   * @param {string} id The Google OAuth ID.
   *
   * @returns {Promise<UserDto>} The user and its preferences.
   */
  getUserById(id: string): Promise<UserDto>;

  /**
   * Registers a new user into the database.
   *
   * @param {UserRegisterDto} user The user to register.
   *
   * @returns {Promise<UserDto>} The registered user.
   */
  registerUser(user: UserRegisterDto): Promise<UserDto>;

  /**
   * Marks a concert preference for a user.
   *
   * @param {string} userId The user's ObjectId reference.
   * @param {string} concertId The concert's ObjectId.
   * @param {boolean} preferred Wether the user wants to know about this concert or not.
   *
   * @returns {Promise<UserDto>} The user and its preference settings after the update.
   */
  setConcertPreference(
    userId: string,
    concertId: string,
    preferred: boolean,
  ): Promise<UserDto>;
}

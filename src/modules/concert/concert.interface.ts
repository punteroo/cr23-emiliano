import { Concert, ConcertScenario } from './concert.model';

export interface IConcertService {
  /**
   * Fetches all available concerts, populating fields.
   *
   * @noparams
   * @returns {Promise<Concert[]>} All available concerts.
   */
  fetchAllConcerts(): Promise<Concert[]>;

  /**
   * Fetches a concert by its ID.
   *
   * @param {string} id The ID of the concert.
   *
   * @returns {Promise<Concert>} The concert.
   */
  fetchConcertById(id: string): Promise<Concert>;

  /**
   * Finds concerts by their artist.
   *
   * @param {string} artistId The ID of the artist.
   *
   * @returns {Promise<Concert[]>} The concerts where this artist performs in.
   */
  fetchConcertsByArtist(artistId: string): Promise<Concert[]>;

  /**
   * Finds concerts by their venue.
   *
   * @param {ConcertScenario} scenario The scenario to fetch concerts for.
   *
   * @returns {Promise<Concert[]>} The concerts where this venue is used in.
   */
  fetchConcertsByVenue(scenario: ConcertScenario): Promise<Concert[]>;

  /**
   * Performs a query to find concerts that take place between a time range.
   *
   * @param {Date} start The start of the time range.
   * @param {Date} end The end of the time range.
   *
   * @returns {Promise<Concert[]>} Available concerts (if any) in the provided time range.
   */
  fetchConcertsByTimeRange(start: Date, end: Date): Promise<Concert[]>;
}

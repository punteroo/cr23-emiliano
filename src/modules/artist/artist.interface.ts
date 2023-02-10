import { Artist } from './artist.model';

export interface IArtistService {
  /**
   * Fetches a list of all artists.
   *
   * @noparams
   * @returns {Promise<Artist[]>} The list of artists.
   */
  fetchArtists(): Promise<Artist[]>;

  /**
   * Fetches an artist by their name.
   *
   * @param {string} name The name of the artist to fetch.
   * @param {string} [id] The ID of the artist to fetch, if specified.
   *
   * @returns {Promise<Artist>} The artist.
   */
  fetchArtist(name: string, id?: string): Promise<Artist>;
}

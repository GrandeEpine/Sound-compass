import {inject, Injectable} from '@angular/core';
import {Artist, Track, Tracks} from '@spotify/web-api-ts-sdk';
import {ArtistServices} from '../artist-services/artist-services';

@Injectable({
  providedIn: 'root',
})
export class GenreServices {
  private artistServices: ArtistServices = inject(ArtistServices);

  public genresOfArtist(artist: Artist): string[] {
    return artist.genres ?? [];
  }

  /**
   * Get the genres of an artist by their id.
   * @param artistId {string} the id of the artist.
   * @return {Promise<string[]>} A promise of the genres of the artist.
   */
  public async genresOfArtistById(artistId: string): Promise<string[]> {
    const artist: Artist = await this.artistServices.getArtistById(artistId);
    return this.genresOfArtist(artist);
  }

  /**
   * Filter the {Track} if the tracks given by given genres.
   * @param selectedGenres {string[]} the genres to filter the tracks by.
   * @param tracks {Tracks} the tracks to filter.
   * @return {Tracks} the filtered tracks.
   */
  public async filterTracksByGenre(selectedGenres: string[], tracks: Tracks): Promise<Tracks> {
    let filteredTracks: Track[] = [];
    for (const track of tracks.tracks) {
      let genresOfTrack: string[] = await this.genresOfArtistById(track.artists[0].id);

      if (genresOfTrack.some((genre: string):boolean => selectedGenres.includes(genre))) {
        filteredTracks.push(track);
      }
    }
    return {tracks: filteredTracks};
  }
}

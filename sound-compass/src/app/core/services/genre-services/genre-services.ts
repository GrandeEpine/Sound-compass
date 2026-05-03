import { inject, Injectable } from '@angular/core';
import { Artist, Track, Tracks } from '@spotify/web-api-ts-sdk';
import { ArtistServices } from '../artist-services/artist-services';
import { Genre } from '../../models/genre';
import { TrackServices } from '../track-services/track-services';

@Injectable({
  providedIn: 'root',
})
export class GenreServices {
  private artistServices: ArtistServices = inject(ArtistServices);
  private trackService = inject(TrackServices);

  public genresOfArtist(artist: Artist): string[] {
    return artist.genres ?? [];
  }

  /**
   * Get the genres of an artist by their id.
   * @param artistId {string} the id of the artist.
   * @return {Promise<Genre[]>} A promise of the genres of the artist.
   */
  public async genresOfArtistById(artistId: string): Promise<Genre[]> {
    const artist: Artist = await this.artistServices.getArtistById(artistId);
    return this.genresOfArtist(artist).map(
      (genreName: string) => new Genre(genreName, new Set(), new Set<Artist>([artist])),
    );
  }

  /**
   * Filter the {Track} if the tracks given by given genres.
   * @param selectedGenres {Genre[]} the genres to filter the tracks by.
   * @param tracks {Tracks} the tracks to filter.
   * @return {Tracks} the filtered tracks.
   */
  public async filterTracksByGenre(selectedGenres: Genre[], tracks: Tracks): Promise<Tracks> {
    const selectedGenreNames = selectedGenres.map((g) => g.getName());
    const filteredTracks: Track[] = [];

    for (const track of tracks.tracks) {
      const genresOfTrack: Genre[] = await this.genresOfArtistById(track.artists[0].id);

      if (
        genresOfTrack.some((genre: Genre): boolean => selectedGenreNames.includes(genre.getName()))
      ) {
        filteredTracks.push(track);
      }
    }
    return { tracks: filteredTracks };
  }

  public async getGenresFromPlaylist(playlistId: string){
    const tracks = await this.trackService.getTracksFromPlaylist(playlistId);
    const genres: Set<Genre> = new Set<Genre>();

    for (const track of tracks) {
      const genresOfTrack: Genre[] = await this.genresOfArtistById(track.artists[0].id);
      genresOfTrack.forEach((genre: Genre) => genres.add(genre));
    }
    return genres;
  }
}

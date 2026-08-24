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
        genresOfTrack.some((genre: Genre): boolean => selectedGenreNames.includes(genre.getName().toLowerCase()))
      ) {
        filteredTracks.push(track);
      }
    }
    return { tracks: filteredTracks };
  }

  public async getGenresFromPlaylist(playlistId: string){
    const tracks = await this.trackService.getTracksFromPlaylist(playlistId);
    const genres = new Map<string, Genre>();
    const artistCache = new Map<string, Artist>();

    for (const track of tracks) {
      for (const simplifiedArtist of track.artists) {
        const artistId = simplifiedArtist.id;
        let artist = artistCache.get(artistId);
        if (!artist) {
          artist = await this.artistServices.getArtistById(artistId);
          artistCache.set(artistId, artist);
        }
        const genreNames = this.genresOfArtist(artist);
        for (const genreName of genreNames) {
          const key = genreName.toLowerCase();

          let genre = genres.get(key);
          if (!genre) {
            genre = new Genre(genreName, new Set<Track>(), new Set<Artist>());
            genres.set(key, genre);
          }

          genre.addArtist(artist);
          genre.addTrack(track);
        }
      }

    }
    return genres;
  }
}

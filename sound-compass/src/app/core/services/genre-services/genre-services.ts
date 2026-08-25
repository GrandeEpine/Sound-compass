import {inject, Injectable, signal} from '@angular/core';
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
  public status = signal<string>('')

  public genresOfArtist(artist: Artist): string[] {
    const genres = artist.genres ?? [];
    if (genres.length === 0) {
      return ['Other'];
    }
    return genres;
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

  public async getGenresFromPlaylist(playlistId: string){
    const tracks = await this.trackService.getTracksFromPlaylist(playlistId);
    const genres = new Map<string, Genre>();
    const artistCache = new Map<string, Artist>();
    this.status.set("Collecting genres.");
    for (const track of tracks) {
      if (!track.artists || track.artists.length === 0) {
        console.error(`Track ${track.name} has no artists associated with it.`);
        continue;
      }
      for (const simplifiedArtist of track.artists) {
        const artistId = simplifiedArtist.id;
        if (!artistId) {
          console.error(`Artist ID is undefined for artist ${simplifiedArtist.name} in track ${track.name}`);
          continue;
        }
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
      this.status.set("Collecting genres: " + genres.size);

    }
    this.status.set("")
    return genres;
  }
}

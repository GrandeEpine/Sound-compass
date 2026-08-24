import { Artist, Track } from '@spotify/web-api-ts-sdk';

export class Genre {
  private name: string;
  private tracks: Set<Track>;
  private artists: Set<Artist>;

  constructor(name: string, tracks: Set<Track>, artists: Set<Artist>) {
    this.name = name;
    this.tracks = tracks;
    this.artists = artists;
  }

  getName() {
    return this.name;
  }

  setName(genreName: string) {
    this.name = genreName;
  }

  getArtists() {
    return this.artists;
  }

  addArtist(artist: Artist) {
    return this.artists.add(artist);
  }

  getTracks() {
    return this.tracks;
  }

  addTrack(track: Track) {
    return this.tracks.add(track);
  }
}

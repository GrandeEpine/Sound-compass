export interface User {
  id: string;
  country: string;
  name: string;
  email: string;
  followersCount: number;
  product: 'free' | 'premium' | 'open';
  images: SpotifyImage[];
  uri: string;
}

export interface SpotifyImage {
  url: string;
  width: number | null;
  height: number | null;
}

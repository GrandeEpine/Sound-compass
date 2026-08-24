import {Component, effect, inject, input, output, signal} from '@angular/core';
import {ValidateButton} from "../../buttons/validate-button/validate-button";
import {Genre} from '../../../../core/models/genre';
import {ThisReceiver} from '@angular/compiler';

@Component({
  selector: 'app-playlist-genres-search',
    imports: [
    ],
  templateUrl: './playlist-genres-search.html',
  styleUrl: './playlist-genres-search.css',
})
export class PlaylistGenresSearch {
  genre = signal('');
  error = signal<string | null>(null);

  genreList =  input.required<Array<Genre>>();
  foundGenres = output<Array<Genre>>();

  constructor() {
    effect(() => {
      const research = this.genre().toLowerCase().trim();

      if (research === '') {
        this.error.set(null);
        this.foundGenres.emit(this.genreList());
        return;
      }

      const results = this.genreList().filter((genre: Genre) =>
        genre.getName().toLowerCase().includes(research)
      );

      if (results.length === 0) {
        this.error.set('No genre found.');
      } else {
        this.error.set(null);
      }

      this.foundGenres.emit(results);
    });
  }
}

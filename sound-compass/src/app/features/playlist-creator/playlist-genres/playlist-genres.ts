import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { Genre } from '../../../core/models/genre';
import { GenreCard } from '../../../shared/components/cards/genre-card/genre-card';
import { GenreServices } from '../../../core/services/genre-services/genre-services';
import { ValidateButton } from '../../../shared/components/buttons/validate-button/validate-button';

@Component({
  selector: 'app-playlist-genres',
  imports: [GenreCard, ValidateButton],
  templateUrl: './playlist-genres.html',
  styleUrl: './playlist-genres.css',
})
export class PlaylistGenres implements OnInit {
  private genreService = inject(GenreServices);

  public playlistId = input.required<string>();
  protected genresList = signal<Genre[]>([]);
  protected selectedGenreNames = signal<Set<string>>(new Set());
  protected next = output<Set<Genre>>();

  async ngOnInit(): Promise<void> {

    try {
      const genres = await this.genreService.getGenresFromPlaylist(this.playlistId());
      this.genresList.set(Array.from(new Set(genres)));
    } catch (e) {
      const error = (e as Error) ?? new Error('Unable to get genres');
      console.error(error);
    }
  }

  protected isGenreSelected(genre: Genre): boolean {
    return this.selectedGenreNames().has(genre.getName());
  }

  protected toggleGenre(genre: Genre): void {
    const updatedSelection = new Set(this.selectedGenreNames());

    if (updatedSelection.has(genre.getName())) {
      updatedSelection.delete(genre.getName());
    } else {
      updatedSelection.add(genre.getName());
    }

    this.selectedGenreNames.set(updatedSelection);
  }

  protected confirm(): void {
    const selectedGenres = new Set(
      this.genresList().filter((genre) => this.selectedGenreNames().has(genre.getName())),
    );

    if (selectedGenres.size > 0) {
      this.next.emit(selectedGenres);
    }
  }
}

import {Component, computed, inject, input, OnInit, output, signal} from '@angular/core';
import { Genre } from '../../../core/models/genre';
import { GenreCard } from '../../../shared/components/cards/genre-card/genre-card';
import { GenreServices } from '../../../core/services/genre-services/genre-services';
import { ValidateButton } from '../../../shared/components/buttons/validate-button/validate-button';
import {PlaylistGenresSearch} from '../../../shared/components/inputs/playlist-genres-search/playlist-genres-search';
import {Loading} from '../../../shared/components/loading/loading';

@Component({
  selector: 'app-playlist-genres',
  imports: [GenreCard, ValidateButton, PlaylistGenresSearch, Loading],
  templateUrl: './playlist-genres.html',
  styleUrl: './playlist-genres.css',
})
export class PlaylistGenres implements OnInit {
  private genreService = inject(GenreServices);

  public playlistId = input.required<string>();

  protected genresMap = signal<Map<string, Genre>>(new Map<string, Genre>());
  protected selectedGenreNames = signal<Set<string>>(new Set());
  protected filteredGenres = signal<Genre[] | null>(null);
  protected next = output<Set<Genre>>();
  protected displayedGenres = computed<Genre[]>(() => {
    const filtered = this.filteredGenres();
    return filtered !== null ? filtered : Array.from(this.genresMap().values());
  });
  protected calculatedGenres = computed<Genre[]>(() => {
    return Array.from(this.genresMap().values());
  });
  protected isLoading = signal<boolean>(true);

  async ngOnInit(): Promise<void> {
    try {
        const genres = await this.genreService.getGenresFromPlaylist(this.playlistId());
        this.genresMap.set(genres);
     } catch (e) {
      const error = (e as Error) ?? new Error('Unable to get genres');
      console.error(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  protected onGenresFiltered(genresFound: Genre[]): void {
    this.filteredGenres.set(genresFound);
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
    const allGenres = Array.from(this.genresMap().values());

    const selectedGenres = new Set(
      allGenres.filter((genre) => this.selectedGenreNames().has(genre.getName())),
    );

    if (selectedGenres.size > 0) {
      this.next.emit(selectedGenres);
    }
  }
}

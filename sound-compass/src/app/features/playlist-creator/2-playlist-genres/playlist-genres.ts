import {Component, computed, inject, input, OnInit, output, signal} from '@angular/core';
import { Genre } from '../../../core/models/genre';
import { GenreCard } from '../../../shared/components/cards/genre-card/genre-card';
import { GenreServices } from '../../../core/services/genre-services/genre-services';
import { ValidateButton } from '../../../shared/components/buttons/validate-button/validate-button';
import {PlaylistGenresSearch} from '../../../shared/components/inputs/playlist-genres-search/playlist-genres-search';
import {Loading} from '../../../shared/components/loading/loading';
import {TrackServices} from '../../../core/services/track-services/track-services';
import {Auth} from '../../../core/services/auth/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-playlist-genres',
  imports: [GenreCard, ValidateButton, PlaylistGenresSearch, Loading],
  templateUrl: './playlist-genres.html',
  styleUrl: './playlist-genres.css',
})
export class PlaylistGenres implements OnInit {
  private genreService = inject(GenreServices);
  public trackService = inject(TrackServices);

  public playlistId = input.required<string>();

  protected genresMap = signal<Map<string, Genre>>(new Map<string, Genre>());
  protected selectedGenreNames = signal<Set<string>>(new Set());
  protected filteredGenres = signal<Genre[] | null>(null);
  public isAllSelected = signal<boolean>(false);
  public isAlphabeticalSelected = signal<boolean>(false);
  protected isLoading = signal<boolean>(true);

  protected next = output<Set<Genre>>();

  protected displayedGenres = computed<Genre[]>(() => {
    const filtered = this.filteredGenres();

    const genres = filtered !== null
      ? filtered
      : Array.from(this.genresMap().values());

    if (this.isAlphabeticalSelected()) {
      return [...genres].sort((a, b) =>
        a.getName().localeCompare(b.getName(), 'fr', {
          sensitivity: 'base',
        }),
      );
    }

    return genres;
  });
  protected calculatedGenres = computed<Genre[]>(() => {
    return Array.from(this.genresMap().values());
  });
  public status = computed(() => {
    const genreStatus = this.genreService.status();
    if (genreStatus) {
      return genreStatus;
    }

    const trackCount = this.trackService.status();
    if (trackCount > 0) {
      return `${trackCount} tracks found`;
    }

    return 'Finalizing';
  });

  async ngOnInit(): Promise<void> {
    try {
        const genres = await this.genreService.getGenresFromPlaylist(this.playlistId());
        this.genresMap.set(genres);
     } catch (err) {
      const error = (err as Error) ?? new Error('Error');
      if (error.message.includes('Failed to refresh token')
        || error.message.includes('invalid_grant')) {
        const auth = inject(Auth);
        auth.logout();
        await inject(Router).navigate(['/home'])}
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

  protected selectAll(){
    this.isAllSelected.set(!this.isAllSelected());
    if (this.isAllSelected() && this.displayedGenres().length > 0) {
      const selected = this.displayedGenres().map((genre) => genre.getName());
      this.selectedGenreNames.set(new Set(selected));
    } else {
      this.selectedGenreNames.set(new Set());
    }
  }

  protected alphabeticalSort(): void {
    this.isAlphabeticalSelected.update((value) => !value);
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

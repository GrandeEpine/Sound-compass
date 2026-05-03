import { Component, input, output } from '@angular/core';
import { Genre } from '../../../../core/models/genre';

@Component({
  selector: 'app-genre-card',
  imports: [],
  templateUrl: './genre-card.html',
  styleUrl: './genre-card.css',
})
export class GenreCard {
  public genre = input.required<Genre>();
  public isSelected = input.required<boolean>();

  public toggled = output<Genre>();

  toggleSelection(): void {
    this.toggled.emit(this.genre());
  }
}

import { Component, signal } from '@angular/core';
import { Home } from './features/home/home';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Home, Header, Footer],
  template: `
    <app-header />
    <main>
      <section class="content">
        <app-home />
      </section>
    </main>
    <app-footer />
  `,
  styleUrl: './features/home/home.css',
})
export class App {
  protected readonly title = signal('sound-compass');
}

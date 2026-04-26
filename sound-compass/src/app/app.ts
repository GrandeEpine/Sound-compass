import { Component, signal } from '@angular/core';
import { Home } from './features/home/home';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Home, Header, Footer],
  template: `
    <div class="flex flex-col min-h-screen w-full">
      <app-header />
      <main class="flex justify-center flex-row w-full flex-1 ">
        <section class="w-full">
          <app-home />
        </section>
      </main>
      <app-footer />
    </div>
  `,
  styleUrl: './features/home/home.css',
})
export class App {
  protected readonly title = signal('sound-compass');
}

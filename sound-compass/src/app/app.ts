import { Component, signal } from '@angular/core';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Footer, RouterOutlet],
  template: `
    <div class="flex flex-col min-h-screen w-full">
      <app-header />
      <main class="flex justify-center flex-row w-full flex-1 ">
        <section class="w-full">
          <router-outlet />
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

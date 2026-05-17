import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 text-gray-900">
      <header class="border-b bg-white">
        <div class="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <a routerLink="/" class="text-lg font-bold"> Anonymous Posts </a>

          <a
            routerLink="/"
            class="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            New Post
          </a>
        </div>
      </header>

      <main class="mx-auto max-w-3xl px-4 py-8">
        <router-outlet />
      </main>
    </div>
  `,
})
export class App {}

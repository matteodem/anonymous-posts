import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostTokenService {
  private readonly storageKey = 'anonymousPostTokens';

  getToken(slug: string): string | null {
    const tokens = this.getAllTokens();
    return tokens[slug] ?? null;
  }

  saveToken(slug: string, token: string): void {
    const tokens = this.getAllTokens();
    tokens[slug] = token;

    localStorage.setItem(this.storageKey, JSON.stringify(tokens));
  }

  removeToken(slug: string): void {
    const tokens = this.getAllTokens();
    delete tokens[slug];

    localStorage.setItem(this.storageKey, JSON.stringify(tokens));
  }

  hasToken(slug: string): boolean {
    return this.getToken(slug) !== null;
  }

  private getAllTokens(): Record<string, string> {
    const raw = localStorage.getItem(this.storageKey);

    if (!raw) {
      return {};
    }

    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
}

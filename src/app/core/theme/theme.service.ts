import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'gallery-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  /** Signal reativo: componentes podem ler `themeService.mode()` no template. */
  readonly mode = signal<ThemeMode>(this.resolveInitialTheme());

  constructor() {
    this.applyToDocument(this.mode());
  }

  toggle(): void {
    this.setMode(this.mode() === 'dark' ? 'light' : 'dark');
  }

  setMode(mode: ThemeMode): void {
    this.mode.set(mode);
    this.applyToDocument(mode);
    localStorage.setItem(STORAGE_KEY, mode);
  }

  private applyToDocument(mode: ThemeMode): void {
    if (mode === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  private resolveInitialTheme(): ThemeMode {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (saved === 'light' || saved === 'dark') return saved;

    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
}

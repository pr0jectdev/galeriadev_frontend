import { Component, EventEmitter, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/theme/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  auth = inject(AuthService);
  theme = inject(ThemeService);

  @Output() loginClick = new EventEmitter<void>();
  @Output() registerClick = new EventEmitter<void>();
  @Output() uploadClick = new EventEmitter<void>();
  @Output() suggestCategoryClick = new EventEmitter<void>();
  @Output() suggestSubcategoryClick = new EventEmitter<void>();

  userMenuOpen = false;

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  logout(): void {
    this.userMenuOpen = false;
    this.auth.logout();
  }
}

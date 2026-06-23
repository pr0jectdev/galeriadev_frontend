import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoginModalComponent } from '../../features/auth/login-modal/login-modal.component';
import { RegisterModalComponent } from '../../features/auth/register-modal/register-modal.component';
import { UploadModalComponent } from '../../features/gallery/upload-modal/upload-modal.component';
import { CategorySuggestionModalComponent } from '../../features/gallery/category-suggestion-modal/category-suggestion-modal.component';
import { SubcategorySuggestionModalComponent } from '../../features/gallery/subcategory-suggestion-modal/subcategory-suggestion-modal.component';

type ActiveModal = 'login' | 'register' | 'upload' | 'suggest-category' | 'suggest-subcategory' | null;

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    LoginModalComponent,
    RegisterModalComponent,
    UploadModalComponent,
    CategorySuggestionModalComponent,
    SubcategorySuggestionModalComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  activeModal = signal<ActiveModal>(null);

  open(modal: ActiveModal): void {
    this.activeModal.set(modal);
  }

  close(): void {
    this.activeModal.set(null);
  }

  switchToRegister(): void {
    this.activeModal.set('register');
  }

  switchToLogin(): void {
    this.activeModal.set('login');
  }
}

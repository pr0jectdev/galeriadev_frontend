import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../shared/ui/modal.component';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [FormsModule, ModalComponent],
  templateUrl: './login-modal.component.html'
})
export class LoginModalComponent {
  private auth = inject(AuthService);
  private notifications = inject(NotificationService);

  @Output() close = new EventEmitter<void>();
  @Output() switchToRegister = new EventEmitter<void>();

  email = '';
  password = '';
  loading = signal(false);

  submit(): void {
    if (!this.email || !this.password) return;

    this.loading.set(true);
    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.notifications.success('Login realizado com sucesso!');
        this.close.emit();
      },
      error: () => this.loading.set(false)
    });
  }
}

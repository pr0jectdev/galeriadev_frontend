import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../shared/ui/modal.component';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [FormsModule, ModalComponent],
  templateUrl: './register-modal.component.html'
})
export class RegisterModalComponent {
  private auth = inject(AuthService);
  private notifications = inject(NotificationService);

  @Output() close = new EventEmitter<void>();
  @Output() switchToLogin = new EventEmitter<void>();

  username = '';
  email = '';
  password = '';
  loading = signal(false);

  submit(): void {
    if (!this.username || !this.email || !this.password) return;

    this.loading.set(true);
    this.auth.register(this.username, this.email, this.password).subscribe({
      next: () => {
        this.notifications.success('Cadastro realizado! Aguarde a aprovação de um administrador para poder entrar.');
        this.close.emit();
      },
      error: () => this.loading.set(false)
    });
  }
}

import { Component, inject } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  template: `
    <div class="toast-stack">
      @for (toast of notifications.toasts(); track toast.id) {
        <div class="toast" [class]="toast.type">
          {{ toast.message }}
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-stack {
      position: fixed;
      bottom: var(--space-5);
      right: var(--space-5);
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      z-index: 1000;
    }
    .toast {
      padding: var(--space-3) var(--space-4);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
      font-size: 14px;
      font-weight: 500;
      color: var(--color-text-on-brand);
      background: var(--color-text-primary);
      min-width: 220px;
      max-width: 360px;
    }
    .toast.success { background: var(--color-success); color: #fff; }
    .toast.error { background: var(--color-danger); color: #fff; }
    .toast.info { background: var(--color-info); color: #fff; }
  `]
})
export class ToastContainerComponent {
  notifications = inject(NotificationService);
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    <div class="backdrop" (click)="close.emit()">
      <div class="panel" (click)="$event.stopPropagation()">
        <header>
          <h2>{{ title }}</h2>
          <button class="close-btn" (click)="close.emit()" aria-label="Fechar">✕</button>
        </header>
        <div class="body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(10, 11, 15, 0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 500;
      padding: var(--space-4);
    }
    .panel {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      width: 100%;
      max-width: 480px;
      max-height: 90vh;
      overflow-y: auto;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-4) var(--space-5);
      border-bottom: 1px solid var(--color-border);
    }
    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--color-text-primary);
    }
    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--color-text-secondary);
      font-size: 16px;
      line-height: 1;
      padding: var(--space-2);
      border-radius: var(--radius-sm);
    }
    .close-btn:hover {
      background: var(--color-surface-hover);
      color: var(--color-text-primary);
    }
    .body {
      padding: var(--space-5);
    }
  `]
})
export class ModalComponent {
  @Input() title = '';
  @Output() close = new EventEmitter<void>();
}

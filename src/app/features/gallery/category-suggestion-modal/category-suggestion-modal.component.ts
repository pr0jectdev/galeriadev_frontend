import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../shared/ui/modal.component';
import { CategoryService } from '../../../core/services/category.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-category-suggestion-modal',
  standalone: true,
  imports: [FormsModule, ModalComponent],
  templateUrl: './category-suggestion-modal.component.html'
})
export class CategorySuggestionModalComponent {
  private categoryService = inject(CategoryService);
  private notifications = inject(NotificationService);

  @Output() close = new EventEmitter<void>();

  name = '';
  loading = signal(false);

  submit(): void {
    if (!this.name.trim()) return;

    this.loading.set(true);
    this.categoryService.suggestCategory(this.name.trim()).subscribe({
      next: () => {
        this.notifications.success('Sugestão enviada! Um administrador irá analisá-la.');
        this.close.emit();
      },
      error: () => this.loading.set(false)
    });
  }
}

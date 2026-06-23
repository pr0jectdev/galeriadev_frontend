import { Component, EventEmitter, OnInit, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../shared/ui/modal.component';
import { CategoryService } from '../../../core/services/category.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-subcategory-suggestion-modal',
  standalone: true,
  imports: [FormsModule, ModalComponent],
  templateUrl: './subcategory-suggestion-modal.component.html'
})
export class SubcategorySuggestionModalComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private notifications = inject(NotificationService);

  @Output() close = new EventEmitter<void>();

  categories = signal<Category[]>([]);
  categoryId = '';
  name = '';
  loading = signal(false);

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((categories) => this.categories.set(categories));
  }

  submit(): void {
    if (!this.categoryId || !this.name.trim()) return;

    this.loading.set(true);
    this.categoryService.suggestSubcategory(this.categoryId, this.name.trim()).subscribe({
      next: () => {
        this.notifications.success('Sugestão enviada! Um administrador irá analisá-la.');
        this.close.emit();
      },
      error: () => this.loading.set(false)
    });
  }
}

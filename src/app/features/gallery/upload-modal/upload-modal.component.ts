import { Component, EventEmitter, OnInit, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../shared/ui/modal.component';
import { CategoryService } from '../../../core/services/category.service';
import { ImageService } from '../../../core/services/image.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-upload-modal',
  standalone: true,
  imports: [FormsModule, ModalComponent],
  templateUrl: './upload-modal.component.html'
})
export class UploadModalComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private imageService = inject(ImageService);
  private notifications = inject(NotificationService);

  @Output() close = new EventEmitter<void>();

  categories = signal<Category[]>([]);
  categoryId = '';
  subcategoryId = '';
  title = '';
  selectedFile: File | null = null;
  loading = signal(false);

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((categories) => this.categories.set(categories));
  }

  get subcategories() {
    return this.categories().find((c) => c.id === this.categoryId)?.subcategories ?? [];
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  submit(): void {
    if (!this.categoryId || !this.subcategoryId || !this.selectedFile) {
      this.notifications.error('Selecione categoria, subcategoria e um arquivo de imagem.');
      return;
    }

    this.loading.set(true);
    this.imageService.upload(this.categoryId, this.subcategoryId, this.title || null, this.selectedFile).subscribe({
      next: () => {
        this.notifications.success('Imagem enviada! Ela ficará visível assim que for aprovada.');
        this.close.emit();
      },
      error: () => this.loading.set(false)
    });
  }
}

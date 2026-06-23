import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../core/services/category.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-categories-management',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './categories-management.component.html',
  styleUrl: './categories-management.component.scss'
})
export class CategoriesManagementComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private notifications = inject(NotificationService);

  categories = signal<Category[]>([]);
  newCategoryName = '';
  subcategoryInputs: Record<string, string> = {};

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.categoryService.getAll().subscribe((categories) => this.categories.set(categories));
  }

  createCategory(): void {
    if (!this.newCategoryName.trim()) return;
    this.categoryService.create(this.newCategoryName.trim()).subscribe(() => {
      this.notifications.success('Categoria criada.');
      this.newCategoryName = '';
      this.load();
    });
  }

  deleteCategory(id: string): void {
    if (!confirm('Remover esta categoria? As subcategorias e imagens vinculadas também serão afetadas.')) return;
    this.categoryService.delete(id).subscribe(() => {
      this.notifications.success('Categoria removida.');
      this.load();
    });
  }

  createSubcategory(categoryId: string): void {
    const name = this.subcategoryInputs[categoryId]?.trim();
    if (!name) return;

    this.categoryService.createSubcategory(categoryId, name).subscribe(() => {
      this.notifications.success('Subcategoria criada.');
      this.subcategoryInputs[categoryId] = '';
      this.load();
    });
  }

  deleteSubcategory(id: string): void {
    if (!confirm('Remover esta subcategoria?')) return;
    this.categoryService.deleteSubcategory(id).subscribe(() => {
      this.notifications.success('Subcategoria removida.');
      this.load();
    });
  }
}

import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);

  categories = signal<Category[]>([]);
  expandedCategoryId = signal<string | null>(null);

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((categories) => this.categories.set(categories));
  }

  toggle(categoryId: string): void {
    this.expandedCategoryId.set(this.expandedCategoryId() === categoryId ? null : categoryId);
  }
}

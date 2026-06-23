import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Suggestion } from '../../../core/models/category.model';

@Component({
  selector: 'app-suggestions-approval',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './suggestions-approval.component.html',
  styleUrl: './suggestions-approval.component.scss'
})
export class SuggestionsApprovalComponent implements OnInit {
  private adminService = inject(AdminService);
  private notifications = inject(NotificationService);

  categorySuggestions = signal<Suggestion[]>([]);
  subcategorySuggestions = signal<Suggestion[]>([]);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.adminService.getCategorySuggestions().subscribe((s) => this.categorySuggestions.set(s));
    this.adminService.getSubcategorySuggestions().subscribe((s) => this.subcategorySuggestions.set(s));
  }

  reviewCategory(id: string, approve: boolean): void {
    this.adminService.reviewCategorySuggestion(id, approve).subscribe(() => {
      this.notifications.success(approve ? 'Categoria aprovada e criada.' : 'Sugestão rejeitada.');
      this.load();
    });
  }

  reviewSubcategory(id: string, approve: boolean): void {
    this.adminService.reviewSubcategorySuggestion(id, approve).subscribe(() => {
      this.notifications.success(approve ? 'Subcategoria aprovada e criada.' : 'Sugestão rejeitada.');
      this.load();
    });
  }
}

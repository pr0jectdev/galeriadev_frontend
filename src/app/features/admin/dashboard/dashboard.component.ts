import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private adminService = inject(AdminService);

  pendingUsers = signal(0);
  pendingImages = signal(0);
  pendingCategorySuggestions = signal(0);
  pendingSubcategorySuggestions = signal(0);

  ngOnInit(): void {
    this.adminService.getUsers('pending').subscribe((u) => this.pendingUsers.set(u.length));
    this.adminService.getPendingImages().subscribe((i) => this.pendingImages.set(i.length));
    this.adminService.getCategorySuggestions().subscribe((s) => this.pendingCategorySuggestions.set(s.length));
    this.adminService.getSubcategorySuggestions().subscribe((s) => this.pendingSubcategorySuggestions.set(s.length));
  }
}

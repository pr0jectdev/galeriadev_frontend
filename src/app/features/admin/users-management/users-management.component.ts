import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService, AdminUser } from '../../../core/services/admin.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ModalComponent } from '../../../shared/ui/modal.component';

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [FormsModule, ModalComponent],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.scss'
})
export class UsersManagementComponent implements OnInit {
  private adminService = inject(AdminService);
  private notifications = inject(NotificationService);

  users = signal<AdminUser[]>([]);
  statusFilter = signal<string>('');
  showCreateModal = signal(false);

  newUsername = '';
  newEmail = '';
  newPassword = '';
  newRole: 'user' | 'admin' = 'user';
  creating = signal(false);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.adminService.getUsers(this.statusFilter() || undefined).subscribe((users) => this.users.set(users));
  }

  setFilter(status: string): void {
    this.statusFilter.set(status);
    this.load();
  }

  approve(id: string): void {
    this.adminService.approveUser(id).subscribe(() => {
      this.notifications.success('Usuário aprovado.');
      this.load();
    });
  }

  reject(id: string): void {
    this.adminService.rejectUser(id).subscribe(() => {
      this.notifications.success('Usuário rejeitado.');
      this.load();
    });
  }

  remove(id: string): void {
    if (!confirm('Remover este usuário permanentemente?')) return;
    this.adminService.deleteUser(id).subscribe(() => {
      this.notifications.success('Usuário removido.');
      this.load();
    });
  }

  createUser(): void {
    if (!this.newUsername || !this.newEmail || !this.newPassword) return;

    this.creating.set(true);
    this.adminService.createUser(this.newUsername, this.newEmail, this.newPassword, this.newRole).subscribe({
      next: () => {
        this.notifications.success('Usuário criado com sucesso.');
        this.creating.set(false);
        this.showCreateModal.set(false);
        this.newUsername = this.newEmail = this.newPassword = '';
        this.newRole = 'user';
        this.load();
      },
      error: () => this.creating.set(false)
    });
  }
}

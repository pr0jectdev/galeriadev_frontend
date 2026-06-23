import { Component, OnInit, inject, signal } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { ImageService } from '../../../core/services/image.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ImageListItem } from '../../../core/models/image.model';

@Component({
  selector: 'app-uploads-approval',
  standalone: true,
  templateUrl: './uploads-approval.component.html',
  styleUrl: './uploads-approval.component.scss'
})
export class UploadsApprovalComponent implements OnInit {
  private adminService = inject(AdminService);
  imageService = inject(ImageService);
  private notifications = inject(NotificationService);

  pendingImages = signal<ImageListItem[]>([]);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.adminService.getPendingImages().subscribe((images) => this.pendingImages.set(images));
  }

  review(id: string, approve: boolean): void {
    this.adminService.reviewImage(id, approve).subscribe(() => {
      this.notifications.success(approve ? 'Imagem aprovada.' : 'Imagem rejeitada.');
      this.load();
    });
  }
}

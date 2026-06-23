import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ImageService } from '../../core/services/image.service';
import { ImageDetail } from '../../core/models/image.model';
import { formatFileSize } from '../utils/format.util';

@Component({
  selector: 'app-image-viewer-modal',
  standalone: true,
  templateUrl: './image-viewer-modal.component.html',
  styleUrl: './image-viewer-modal.component.scss'
})
export class ImageViewerModalComponent implements OnInit {
  private imageService = inject(ImageService);

  @Input({ required: true }) imageId!: string;
  @Output() close = new EventEmitter<void>();

  detail: ImageDetail | null = null;
  loading = true;

  ngOnInit(): void {
    this.imageService.getById(this.imageId, true).subscribe((detail) => {
      this.detail = detail;
      this.loading = false;
    });
  }

  get fileUrl(): string {
    return this.imageService.fileUrl(this.imageId);
  }

  get formattedSize(): string {
    return this.detail ? formatFileSize(this.detail.fileSizeBytes) : '';
  }
}

import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ImageListItem } from '../../core/models/image.model';
import { formatFileSize } from '../utils/format.util';
import { ImageService } from '../../core/services/image.service';

@Component({
  selector: 'app-image-card',
  standalone: true,
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss'
})
export class ImageCardComponent {
  private imageService = inject(ImageService);

  @Input({ required: true }) image!: ImageListItem;
  @Output() open = new EventEmitter<void>();

  get thumbnailUrl(): string {
    return this.imageService.thumbnailUrl(this.image.id);
  }

  get formattedSize(): string {
    return formatFileSize(this.image.fileSizeBytes);
  }

  get formattedDate(): string {
    return new Date(this.image.createdAt).toLocaleDateString('pt-BR');
  }
}

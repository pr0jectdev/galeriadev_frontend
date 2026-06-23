import { Component, Input, signal } from '@angular/core';
import { ImageListItem } from '../../core/models/image.model';
import { ImageCardComponent } from '../image-card/image-card.component';
import { ImageViewerModalComponent } from '../image-viewer-modal/image-viewer-modal.component';

@Component({
  selector: 'app-image-grid',
  standalone: true,
  imports: [ImageCardComponent, ImageViewerModalComponent],
  templateUrl: './image-grid.component.html',
  styleUrl: './image-grid.component.scss'
})
export class ImageGridComponent {
  @Input({ required: true }) images: ImageListItem[] = [];
  @Input() emptyMessage = 'Nenhuma imagem encontrada.';

  selectedImageId = signal<string | null>(null);
}

import { Component, OnInit, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ImageService } from '../../core/services/image.service';
import { ImageListItem } from '../../core/models/image.model';
import { ImageGridComponent } from '../../shared/image-grid/image-grid.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ImageGridComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  auth = inject(AuthService);
  private imageService = inject(ImageService);

  images = signal<ImageListItem[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.imageService.getMine().subscribe((images) => {
      this.images.set(images);
      this.loading.set(false);
    });
  }
}

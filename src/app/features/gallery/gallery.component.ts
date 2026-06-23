import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../../core/services/image.service';
import { ImageListItem } from '../../core/models/image.model';
import { ImageGridComponent } from '../../shared/image-grid/image-grid.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ImageGridComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  private imageService = inject(ImageService);
  private route = inject(ActivatedRoute);

  images = signal<ImageListItem[]>([]);
  page = signal(1);
  totalCount = signal(0);
  pageSize = 24;
  loading = signal(true);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.page.set(1);
      this.fetch(params.get('categoryId') ?? undefined, params.get('subcategoryId') ?? undefined);
    });
  }

  private categoryId?: string;
  private subcategoryId?: string;

  private fetch(categoryId?: string, subcategoryId?: string): void {
    this.categoryId = categoryId;
    this.subcategoryId = subcategoryId;
    this.loading.set(true);

    this.imageService.getApproved({
      categoryId,
      subcategoryId,
      page: this.page(),
      pageSize: this.pageSize
    }).subscribe((result) => {
      this.images.set(result.items);
      this.totalCount.set(result.totalCount);
      this.loading.set(false);
    });
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalCount() / this.pageSize));
  }

  pageNumbers = computed(() => Array.from({ length: this.totalPages }, (_, i) => i + 1));

  goToPage(page: number): void {
    this.page.set(page);
    this.fetch(this.categoryId, this.subcategoryId);
  }
}

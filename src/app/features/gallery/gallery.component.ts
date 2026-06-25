import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../../core/services/image.service';
import { ImageListItem } from '../../core/models/image.model';
import { ImageGridComponent } from '../../shared/image-grid/image-grid.component';
import { environment } from '../../../environments/environment';

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
  private http = inject(HttpClient);

  images = signal<ImageListItem[]>([]);
  page = signal(1);
  totalCount = signal(0);
  pageSize = 24;
  loading = signal(true);

  // Estado dos botões de debug
  debugApiUrl = signal<string | null>(null);
  debugTestResult = signal<string | null>(null);

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

  // ── Botões de debug ──────────────────────────────────────────────────────

  debugLogEnv(): void {
    const env = environment.production ? 'PRODUÇÃO' : 'DESENVOLVIMENTO';
    console.log(`[DEBUG] Ambiente: ${env}`);
    console.log('[DEBUG] environment:', environment);
  }

  debugShowUrl(): void {
    this.debugApiUrl.set(environment.apiUrl);
    console.log('[DEBUG] API URL:', environment.apiUrl);
  }

  debugTestApi(): void {
    this.debugTestResult.set('Testando...');
    this.http.get(`${environment.apiUrl}/categories`).subscribe({
      next: (res) => {
        const msg = `✅ Comunicação OK — ${Array.isArray(res) ? res.length : '?'} categorias recebidas`;
        this.debugTestResult.set(msg);
        console.log('[DEBUG] Resposta da API:', res);
      },
      error: (err) => {
        const msg = `❌ Falha — ${err.status} ${err.statusText || err.message}`;
        this.debugTestResult.set(msg);
        console.error('[DEBUG] Erro na API:', err);
      }
    });
  }
}

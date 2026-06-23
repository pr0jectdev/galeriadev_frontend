import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ImageDetail, ImageListItem, PagedResult } from '../models/image.model';

@Injectable({ providedIn: 'root' })
export class ImageService {
  private readonly base = `${environment.apiUrl}/images`;

  constructor(private http: HttpClient) {}

  getApproved(opts: { categoryId?: string; subcategoryId?: string; page?: number; pageSize?: number }): Observable<PagedResult<ImageListItem>> {
    let params = new HttpParams()
      .set('page', opts.page ?? 1)
      .set('pageSize', opts.pageSize ?? 24);

    if (opts.categoryId) params = params.set('categoryId', opts.categoryId);
    if (opts.subcategoryId) params = params.set('subcategoryId', opts.subcategoryId);

    return this.http.get<PagedResult<ImageListItem>>(this.base, { params });
  }

  getMine(): Observable<ImageListItem[]> {
    return this.http.get<ImageListItem[]>(`${this.base}/mine`);
  }

  getById(id: string, countClick = true): Observable<ImageDetail> {
    return this.http.get<ImageDetail>(`${this.base}/${id}`, { params: { countClick } });
  }

  thumbnailUrl(id: string): string {
    return `${this.base}/${id}/thumbnail`;
  }

  fileUrl(id: string): string {
    return `${this.base}/${id}/file`;
  }

  upload(categoryId: string, subcategoryId: string, title: string | null, file: File): Observable<ImageDetail> {
    const formData = new FormData();
    formData.append('categoryId', categoryId);
    formData.append('subcategoryId', subcategoryId);
    if (title) formData.append('title', title);
    formData.append('file', file);

    return this.http.post<ImageDetail>(this.base, formData);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}

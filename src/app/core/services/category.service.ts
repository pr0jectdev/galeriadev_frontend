import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category, Subcategory, Suggestion } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly base = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.base);
  }

  create(name: string): Observable<Category> {
    return this.http.post<Category>(this.base, { name });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  createSubcategory(categoryId: string, name: string): Observable<Subcategory> {
    return this.http.post<Subcategory>(`${this.base}/subcategories`, { categoryId, name });
  }

  deleteSubcategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/subcategories/${id}`);
  }

  suggestCategory(name: string): Observable<Suggestion> {
    return this.http.post<Suggestion>(`${environment.apiUrl}/suggestions/categories`, { name });
  }

  suggestSubcategory(categoryId: string, name: string): Observable<Suggestion> {
    return this.http.post<Suggestion>(`${environment.apiUrl}/suggestions/subcategories`, { categoryId, name });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { ImageListItem } from '../models/image.model';
import { Suggestion } from '../models/category.model';

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly base = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  // ---- Usuários ----
  getUsers(status?: string): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(`${this.base}/users`, { params: status ? { status } : {} });
  }

  createUser(username: string, email: string, password: string, role: 'user' | 'admin'): Observable<AdminUser> {
    return this.http.post<AdminUser>(`${this.base}/users`, { username, email, password, role });
  }

  approveUser(id: string): Observable<void> {
    return this.http.post<void>(`${this.base}/users/${id}/approve`, {});
  }

  rejectUser(id: string): Observable<void> {
    return this.http.post<void>(`${this.base}/users/${id}/reject`, {});
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/users/${id}`);
  }

  // ---- Imagens pendentes ----
  getPendingImages(): Observable<ImageListItem[]> {
    return this.http.get<ImageListItem[]>(`${this.base}/images/pending`);
  }

  reviewImage(id: string, approve: boolean): Observable<void> {
    return this.http.post<void>(`${this.base}/images/${id}/review`, { approve });
  }

  // ---- Sugestões ----
  getCategorySuggestions(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(`${this.base}/category-suggestions`);
  }

  reviewCategorySuggestion(id: string, approve: boolean): Observable<void> {
    return this.http.post<void>(`${this.base}/category-suggestions/${id}/review`, { approve });
  }

  getSubcategorySuggestions(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(`${this.base}/subcategory-suggestions`);
  }

  reviewSubcategorySuggestion(id: string, approve: boolean): Observable<void> {
    return this.http.post<void>(`${this.base}/subcategory-suggestions/${id}/review`, { approve });
  }
}

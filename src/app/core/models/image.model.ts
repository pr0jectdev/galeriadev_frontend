export interface ImageListItem {
  id: string;
  title?: string;
  thumbnailUrl: string;
  createdAt: string;
  categoryName: string;
  subcategoryName: string;
  clicks: number;
  fileSizeBytes: number;
  width: number;
  height: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ImageDetail extends ImageListItem {
  originalUrl: string;
  categoryId: string;
  subcategoryId: string;
  uploadedByUsername: string;
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
}

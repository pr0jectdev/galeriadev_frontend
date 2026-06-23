export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

export interface Suggestion {
  id: string;
  name: string;
  categoryId?: string;
  categoryName?: string;
  suggestedBy: string;
  suggestedByUsername: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

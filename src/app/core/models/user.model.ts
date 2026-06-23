export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  status: 'pending' | 'approved' | 'rejected';
}

export interface AuthResponse {
  accessToken: string;
  expiresAt: string;
  user: User;
}

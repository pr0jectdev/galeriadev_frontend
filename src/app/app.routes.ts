import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { GalleryComponent } from './features/gallery/gallery.component';
import { ProfileComponent } from './features/profile/profile.component';
import { authGuard, adminGuard } from './core/guards/auth.guard';
import { AdminLayoutComponent } from './features/admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { UsersManagementComponent } from './features/admin/users-management/users-management.component';
import { CategoriesManagementComponent } from './features/admin/categories-management/categories-management.component';
import { UploadsApprovalComponent } from './features/admin/uploads-approval/uploads-approval.component';
import { SuggestionsApprovalComponent } from './features/admin/suggestions-approval/suggestions-approval.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: GalleryComponent },
      { path: 'perfil', component: ProfileComponent, canActivate: [authGuard] }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'usuarios', component: UsersManagementComponent },
      { path: 'categorias', component: CategoriesManagementComponent },
      { path: 'uploads', component: UploadsApprovalComponent },
      { path: 'sugestoes', component: SuggestionsApprovalComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

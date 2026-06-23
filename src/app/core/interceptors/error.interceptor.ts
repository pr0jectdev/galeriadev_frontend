import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const notifications = inject(NotificationService);

  return next(req).pipe(
    catchError((error) => {
      const message = error?.error?.error ?? 'Ocorreu um erro inesperado. Tente novamente.';

      if (error.status === 401) {
        authService.logout();
        router.navigate(['/']);
      }

      notifications.error(message);
      return throwError(() => error);
    })
  );
};

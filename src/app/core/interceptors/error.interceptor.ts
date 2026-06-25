import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

// export const errorInterceptor: HttpInterceptorFn = (req, next) => {
//   const router = inject(Router);
//   const authService = inject(AuthService);
//   const notifications = inject(NotificationService);

//   return next(req).pipe(
//     catchError((error) => {
//       const message = error?.error?.error ?? 'Ocorreu um erro inesperado. Tente novamente.';

//       if (error.status === 401) {
//         authService.logout();
//         router.navigate(['/']);
//       }

//       notifications.error(message);
//       return throwError(() => error);
//     })
//   );
// };

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const notifications = inject(NotificationService);

  return next(req).pipe(
    catchError((error) => {
      console.error('[ErrorInterceptor] status:', error.status);
      console.error('[ErrorInterceptor] error:', error.error);

      const message = extractMessage(error);
      
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/']);
      }

      notifications.error(message);
      return throwError(() => error);
    })
  );
};

function extractMessage(error: any): string {
  const body = error?.error;

  if (typeof body === 'string' && body.length > 0) return body;
  if (typeof body?.message === 'string') return body.message;
  if (typeof body?.error === 'string') return body.error;
  if (typeof body?.title === 'string') return body.title; // padrão do .NET ValidationProblem

  return 'Ocorreu um erro inesperado. Tente novamente.';
}

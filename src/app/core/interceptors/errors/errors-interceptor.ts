import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  /* Dependency Injection */
  /* Inject ToastrService service through function injection */
  const toastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((err) => {
      toastrService.error(err.message, 'Prestora');
      return throwError(err);
    })
  );
};

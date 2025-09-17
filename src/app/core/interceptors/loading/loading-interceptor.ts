import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  /* Dependency Injection */
  /* Inject NgxSpinnerService service through function injection */
  const ngxSpinnerService = inject(NgxSpinnerService);

  /* Show spinner on each http request call */
  ngxSpinnerService.show('prestora-spinner');

  return next(req).pipe(
    finalize(() => {
      /* Hide spinner on each http response */
      ngxSpinnerService.hide('prestora-spinner');
    })
  );
};

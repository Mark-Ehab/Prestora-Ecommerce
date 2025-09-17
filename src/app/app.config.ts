import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withHashLocation,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptors/headers/headers-interceptor';
import { errorsInterceptor } from './core/interceptors/errors/errors-interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      ...[
        // withHashLocation(),
        withViewTransitions(),
        withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      ]
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      ...[
        withFetch(),
        withInterceptors([
          headersInterceptor,
          errorsInterceptor,
          loadingInterceptor,
        ]),
      ]
    ),
    provideAnimations(),
    importProvidersFrom(CookieService, NgxSpinnerService),
    provideToastr(),
  ],
};

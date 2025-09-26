import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'productdetails/:slug_name/:id', renderMode: RenderMode.Server },
  { path: 'productdetails/:id', renderMode: RenderMode.Server },
  { path: 'checkout/:id', renderMode: RenderMode.Server },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];

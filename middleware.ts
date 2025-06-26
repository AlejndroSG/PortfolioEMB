// Middleware temporalmente desactivado para permitir la compilación sin internacionalización
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Este middleware permitirá acceder directamente a la página principal
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  // Matcher que excluye archivos estáticos, API, etc.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

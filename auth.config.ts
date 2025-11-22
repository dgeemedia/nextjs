// auth.config.ts
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
    callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      // If user is trying to access /dashboard, require login
      if (isOnDashboard) return isLoggedIn;

      // Otherwise allow access (or let pages handle redirect if needed)
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
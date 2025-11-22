// app/dashboard/layout.tsx
import SideNav from '@/app/ui/dashboard/sidenav';
import { auth } from '@/auth'; // server-side helper from your NextAuth setup
import Link from 'next/link';

export default async function Layout({ children }: { children: React.ReactNode }) {
  // server-side check for session/user
  const session = await auth();
  const isLoggedIn = !!session?.user;

  // If not logged in, show Access Denied message (no redirect)
  if (!isLoggedIn) {
    return (
      <main className="flex items-center justify-center h-screen bg-gray-50">
        <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow">
          <h1 className="mb-2 text-lg font-semibold text-red-600">Access denied</h1>
          <p className="mb-4 text-sm text-gray-700">
            Please sign in with your username and password to access the dashboard.
          </p>
          <div className="flex gap-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Go to sign in
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // User is authenticated — render normal dashboard layout
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}

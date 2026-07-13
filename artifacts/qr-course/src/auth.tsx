/**
 * All login/authentication code for the app lives in this single file.
 *
 * The login system is REAL GOOGLE LOGIN (server-side Google OAuth 2.0 with
 * passport + database sessions — see the API server's auth.ts). No Clerk.
 * No Replit login. The browser talks to it through three endpoints:
 *
 *   GET  /api/auth/google  — starts Google sign-in (full-page redirect)
 *   GET  /api/auth/user    — { authenticated, user } for the current session
 *   POST /api/auth/logout  — ends the session
 *
 * The rest of the app consumes auth only through the exports below:
 *   - useAuth()                  — current session state
 *   - <SignInWithGoogleButton /> — starts Google login
 *   - <AuthHome signedOut={...} /> — "/" gate: dashboard if signed in
 *   - protectedComponent(C)      — route guard HOC for signed-in-only pages
 *   - <UserSection />            — current-user label + sign-out button
 */
import type { ComponentType, ReactNode } from "react";
import { Redirect } from "wouter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Full-page navigation target that starts Google sign-in. */
export const GOOGLE_LOGIN_URL = `${basePath}/api/auth/google`;

export interface AuthUser {
  id: number;
  username: string;
  email: string | null;
  displayName: string | null;
}

interface AuthState {
  authenticated: boolean;
  user: AuthUser | null;
}

/** Current login session, fetched from the server session cookie. */
export function useAuth() {
  const { data, isLoading } = useQuery<AuthState>({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      const res = await fetch(`${basePath}/api/auth/user`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
    staleTime: 60_000,
    retry: 1,
  });

  return {
    isLoading,
    isAuthenticated: data?.authenticated === true,
    user: data?.user ?? null,
  };
}

/** Button that starts Google sign-in (full-page redirect to Google). */
export function SignInWithGoogleButton({
  className,
  children,
  testId = "button-google-sign-in",
}: {
  className?: string;
  children?: ReactNode;
  testId?: string;
}) {
  return (
    <a href={GOOGLE_LOGIN_URL} data-testid={testId}>
      <button className={className}>{children ?? "Sign in with Google"}</button>
    </a>
  );
}

/**
 * "/" gate: signed-in users go to the dashboard; signed-out users see the
 * provided landing content.
 */
export function AuthHome({ signedOut }: { signedOut: ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth();
  if (isLoading) return null;
  if (isAuthenticated) return <Redirect to="/dashboard" />;
  return <>{signedOut}</>;
}

/** Route-guard HOC: renders the page only when signed in, else redirects home. */
export function protectedComponent(Component: ComponentType<any>) {
  return function Guarded(props: any) {
    const { isLoading, isAuthenticated } = useAuth();
    if (isLoading) return null;
    if (!isAuthenticated) return <Redirect to="/" />;
    return <Component {...props} />;
  };
}

/** Current-user label + sign-out button, used in the top bar. */
export function UserSection() {
  const { user } = useAuth();
  const qc = useQueryClient();

  async function handleSignOut() {
    try {
      await fetch(`${basePath}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      qc.clear();
      window.location.href = `${basePath}/` || "/";
    }
  }

  return (
    <>
      {user && (
        <span
          className="hidden sm:inline text-sm text-muted-foreground max-w-[12rem] truncate"
          title={user.email ?? undefined}
          data-testid="text-user-email"
        >
          {user.email ?? user.displayName ?? user.username}
        </span>
      )}
      <button
        onClick={handleSignOut}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium border border-border hover:bg-secondary"
        data-testid="button-sign-out"
        title="Sign out"
      >
        <LogOut className="w-4 h-4" />
        Sign out
      </button>
    </>
  );
}

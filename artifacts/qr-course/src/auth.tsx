/**
 * All login/authentication code for the app lives in this single file.
 *
 * Nothing outside this file should import from @clerk/* or reference
 * sign-in/sign-up/sign-out logic. The rest of the app consumes auth only
 * through the exports below:
 *
 *   - <AuthProvider>            — mounts Clerk (provider, theming, routing)
 *   - <AuthCacheInvalidator />  — clears React Query cache when the user changes
 *   - <SignInPage /> / <SignUpPage /> — full-page login/registration routes
 *   - <AuthHome signedOut={...} />    — "/" gate: dashboard if signed in
 *   - protectedComponent(C)     — route guard HOC for signed-in-only pages
 *   - <UserSection />           — current-user email + sign-out button (top bar)
 */
import { useEffect, useRef, type ComponentType, type ReactNode } from "react";
import { Redirect, useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  ClerkProvider,
  SignIn,
  SignUp,
  Show,
  useClerk,
  useUser,
} from "@clerk/react";
import { publishableKeyFromHost } from "@clerk/react/internal";
import { shadcn } from "@clerk/themes";
import { LogOut } from "lucide-react";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

// Resolves the key from window.location.hostname so the same build serves
// multiple Clerk custom domains. Do not inline the env var or leave undefined.
const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

// Empty in dev (Clerk hits dev FAPI directly), auto-set in prod. Do not gate
// on import.meta.env.PROD / NODE_ENV — the empty dev value is intentional.
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY in .env file");
}

// Clerk passes full paths to routerPush/routerReplace, but wouter's
// setLocation prepends the base — strip it to avoid doubling.
function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: "clerk",
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: "hsl(222, 47%, 20%)",
    colorForeground: "hsl(222, 47%, 11%)",
    colorMutedForeground: "hsl(215, 16%, 47%)",
    colorDanger: "hsl(0, 84%, 60%)",
    colorBackground: "hsl(0, 0%, 100%)",
    colorInput: "hsl(0, 0%, 100%)",
    colorInputForeground: "hsl(222, 47%, 11%)",
    colorNeutral: "hsl(214, 32%, 88%)",
    fontFamily: "'Inter', sans-serif",
    borderRadius: "0.375rem",
  },
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox:
      "bg-card border border-border shadow-sm rounded-2xl w-[440px] max-w-full overflow-hidden",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: "text-foreground font-serif",
    headerSubtitle: "text-muted-foreground",
    socialButtonsBlockButton: "border border-border hover:bg-secondary",
    socialButtonsBlockButtonText: "text-foreground font-medium",
    dividerText: "text-muted-foreground",
    dividerLine: "bg-border",
    formFieldLabel: "text-foreground font-medium",
    formFieldInput: "bg-background text-foreground border border-input",
    formButtonPrimary:
      "bg-primary text-primary-foreground hover:bg-primary/90 normal-case",
    footerActionText: "text-muted-foreground",
    footerActionLink: "text-primary hover:text-primary/80",
    identityPreviewEditButton: "text-primary",
    logoBox: "justify-center",
    logoImage: "h-10",
  },
};

/** Mounts Clerk with theming, localization, and wouter router integration. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      localization={{
        signIn: {
          start: {
            title: "Welcome back",
            subtitle:
              "Sign in to continue your Constructive Critical Reasoning course",
          },
        },
        signUp: {
          start: {
            title: "Create your account",
            subtitle: "Start building your constructive critical reasoning",
          },
        },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      {children}
    </ClerkProvider>
  );
}

/**
 * Keep the webview up-to-date when the signed-in user changes by clearing
 * the React Query cache. Must render inside both AuthProvider and
 * QueryClientProvider.
 */
export function AuthCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (
        prevUserIdRef.current !== undefined &&
        prevUserIdRef.current !== userId
      ) {
        qc.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, qc]);

  return null;
}

/** Full-page sign-in route. */
export function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4">
      <SignIn
        routing="path"
        path={`${basePath}/sign-in`}
        signUpUrl={`${basePath}/sign-up`}
      />
    </div>
  );
}

/** Full-page sign-up route. */
export function SignUpPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4">
      <SignUp
        routing="path"
        path={`${basePath}/sign-up`}
        signInUrl={`${basePath}/sign-in`}
      />
    </div>
  );
}

/**
 * "/" gate: signed-in users go to the dashboard; signed-out users see the
 * provided landing content.
 */
export function AuthHome({ signedOut }: { signedOut: ReactNode }) {
  return (
    <>
      <Show when="signed-in">
        <Redirect to="/dashboard" />
      </Show>
      <Show when="signed-out">{signedOut}</Show>
    </>
  );
}

/** Route-guard HOC: renders the page only when signed in, else redirects home. */
export function protectedComponent(Component: ComponentType<any>) {
  return function Guarded(props: any) {
    return (
      <>
        <Show when="signed-in">
          <Component {...props} />
        </Show>
        <Show when="signed-out">
          <Redirect to="/" />
        </Show>
      </>
    );
  };
}

/** Current-user email + sign-out button, used in the top bar. */
export function UserSection() {
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <>
      {user && (
        <span
          className="hidden sm:inline text-sm text-muted-foreground max-w-[12rem] truncate"
          title={user.primaryEmailAddress?.emailAddress ?? undefined}
          data-testid="text-user-email"
        >
          {user.primaryEmailAddress?.emailAddress ?? user.firstName ?? "Account"}
        </span>
      )}
      <button
        onClick={() => signOut({ redirectUrl: basePath || "/" })}
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

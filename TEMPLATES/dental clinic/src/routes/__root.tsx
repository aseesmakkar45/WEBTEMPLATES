import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-brand-900">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-ink-muted">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-900"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">This page didn't load</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Something went wrong on our end. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-900"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "LuminaDental — Precision dental care" },
      {
        name: "description",
        content:
          "Modern dental clinic offering general, cosmetic, and implant dentistry with advanced technology and boutique patient care.",
      },
      { name: "author", content: "LuminaDental" },
      { property: "og:title", content: "LuminaDental — Precision dental care" },
      {
        property: "og:description",
        content:
          "Advanced restorative and cosmetic dentistry in a space designed for your comfort.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "LuminaDental" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "LuminaDental — Precision dental care" },
      { name: "description", content: "Smile Bright Dental is a website for a dental clinic, offering online appointment booking and clinic information." },
      { property: "og:description", content: "Smile Bright Dental is a website for a dental clinic, offering online appointment booking and clinic information." },
      { name: "twitter:description", content: "Smile Bright Dental is a website for a dental clinic, offering online appointment booking and clinic information." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5db542b7-1374-40c2-afb7-16ab677663d6/id-preview-90351356--29fd6d3a-e295-4e2d-a94d-ea282712cb5a.lovable.app-1781277399442.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5db542b7-1374-40c2-afb7-16ab677663d6/id-preview-90351356--29fd6d3a-e295-4e2d-a94d-ea282712cb5a.lovable.app-1781277399442.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div key={location.pathname} className="animate-page-fade flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

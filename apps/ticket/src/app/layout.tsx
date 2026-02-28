// css import 순서 유지를 위해 disable
// eslint-disable-next-line simple-import-sort/imports
import type { Metadata } from "next";

import { GlobalErrorBoundary } from "@/shared/clientBoundary/ErrorBoundary/GlobalErrorBoundary";
import { QueryClientProviders } from "@/lib/queryClient/clientBoundary/QueryClientProvider";
import { OverlayProvider } from "@permit/design-system";

import "@/styles/reset.css";
import "@/styles/global.scss";
import { Header } from "@/shared/components/Header";
import { Footer } from "@/shared/components/Footer";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "PERMIT",
  description: "Permit Ticket",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProd = process.env.NODE_ENV === "production";

  return (
    <html lang="ko">
      <head>
        {isProd && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-R0HMHE4ZHF"
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-R0HMHE4ZHF');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <GlobalErrorBoundary>
          <QueryClientProviders>
            <OverlayProvider>
              <div className="layout">
                {/* TODO: 결제 페이지에서 헤더 없애기 */}
                <Header />
                <main className="main">{children}</main>
                <Footer />
              </div>
            </OverlayProvider>
          </QueryClientProviders>
        </GlobalErrorBoundary>
        <SpeedInsights />
      </body>
    </html>
  );
}

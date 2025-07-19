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

export const metadata: Metadata = {
  title: "Permit",
  description: "Permit Ticket",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
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
      </body>
    </html>
  );
}

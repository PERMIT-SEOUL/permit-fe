// css import 순서 유지를 위해 disable
// eslint-disable-next-line simple-import-sort/imports
import type { Metadata } from "next";

import { QueryClientProviders } from "@/lib/queryClient/clientBoundary/QueryClientProvider";
import { GlobalErrorBoundary } from "@/shared/clientBoundary/ErrorBoundary/GlobalErrorBoundary";

import "@/styles/reset.css";
import "@/styles/global.scss";

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
    <html lang="en">
      <body>
        <GlobalErrorBoundary>
          <QueryClientProviders>{children}</QueryClientProviders>
        </GlobalErrorBoundary>
      </body>
    </html>
  );
}

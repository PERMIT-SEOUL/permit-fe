// css import 순서 유지를 위해 disable
// eslint-disable-next-line simple-import-sort/imports
import type { Metadata } from "next";

import { OverlayProvider } from "@permit/design-system";
import { QueryClientProviders } from "@/lib/queryClient/clientBoundary/QueryClientProvider";
import { Header } from "@/shared/components/Header";

import "@/styles/reset.css";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Ticket Admin",
  description: "Ticket Admin Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body style={{ backgroundColor: "#000" }}>
        <QueryClientProviders>
          <OverlayProvider>
            <Header />
            {children}
          </OverlayProvider>
        </QueryClientProviders>
      </body>
    </html>
  );
}

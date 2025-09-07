import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import { Header } from "@/shared/components/Header";
import { QueryClientProviders } from "@/lib/queryClient/clientBoundary/QueryClientProvider";

export const metadata: Metadata = {
  title: "Ticket Admin",
  description: "Ticket Admin Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body style={{ backgroundColor: "#000" }}>
        <QueryClientProviders>
          <Header />
          {children}
        </QueryClientProviders>
      </body>
    </html>
  );
}

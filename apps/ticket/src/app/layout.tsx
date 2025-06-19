import type { Metadata } from "next";

import { QueryClientProviders } from "@/lib/queryClient/clientBoundary/QueryClientProvider";

import "../styles/normalize.css";

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
        <QueryClientProviders>{children}</QueryClientProviders>
      </body>
    </html>
  );
}

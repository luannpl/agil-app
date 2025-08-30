// src/app/layout.tsx
import "@/app/globals.css";
import { Providers } from "@/app/providers";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <Toaster richColors closeButton position="top-right" />
          {children}
        </Providers>
      </body>
    </html>
  );
}

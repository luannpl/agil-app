import LayoutContent from "@/components/layout/layout-content";
import "../app/globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <Toaster richColors closeButton />
          <LayoutContent>{children}</LayoutContent>
        </Providers>
      </body>
    </html>
  );
}

// src/app/(admin)/admin/layout.tsx
import LayoutContent from "@/components/client/layout/layout-content";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutContent>{children}</LayoutContent>;
}

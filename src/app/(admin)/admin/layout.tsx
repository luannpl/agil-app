// src/app/(admin)/admin/layout.tsx
import LayoutContent from "@/components/layout/layout-content";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutContent>{children}</LayoutContent>;
}

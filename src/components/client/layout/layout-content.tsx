"use client";

import { ReactNode } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";

export default function LayoutContent({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-between flex-col min-h-screen text-white">
      <div>
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
}

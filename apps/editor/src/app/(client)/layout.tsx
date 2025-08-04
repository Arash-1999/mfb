"use client";
import type { ReactNode } from "react";

import { Provider as JotaiProvider } from "jotai";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <JotaiProvider>{children}</JotaiProvider>;
};

export default Layout;

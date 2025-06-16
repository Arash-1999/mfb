import type { PropsWithChildren } from "react";

import { Header } from "./header";
import { Sidebar } from "./sidebar";

interface LayoutProps {
  title: string;
}

const Layout = ({ children, title }: PropsWithChildren<LayoutProps>) => {
  return (
    <div className="p-1 min-h-screen">
      <Header title={title} />
      <div className="flex py-1 gap-1">
        <Sidebar />
        <main className="rounded bg-amber-100 flex-1">{children}</main>
      </div>
    </div>
  );
};

export { Layout };

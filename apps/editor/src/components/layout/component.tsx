import type { PropsWithChildren } from "react";

import { Header } from './header';
import { Sidebar } from './sidebar';

interface LayoutProps {
  title: string;
}

const Layout = ({ children, title }: PropsWithChildren<LayoutProps>) => {
  return (
    <div>
      <Header title={title}/>
      <Sidebar />
      <main>
        {children}
      </main>
    </div>
  );
};

export { Layout };

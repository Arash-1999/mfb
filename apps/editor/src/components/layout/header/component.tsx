import type { ReactNode } from "react";

interface HeaderProps {
  title: ReactNode;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="sticky top-1 z-50 flex items-stretch gap-1 h-12">
      <div className="rounded w-12 bg-amber-500 grid place-items-center">
        MFB
      </div>
      <div className="flex-1 rounded flex items-center bg-amber-300">
        <p>{title}</p>
      </div>
    </header>
  );
};

export { Header };

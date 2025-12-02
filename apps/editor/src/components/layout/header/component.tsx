import type { ReactNode } from 'react';

interface HeaderProps {
  title: ReactNode;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header>
      <p>{title}</p>
    </header>
  )
};

export { Header };

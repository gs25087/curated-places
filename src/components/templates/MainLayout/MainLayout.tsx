import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { Nav } from '@/components/organisms/Nav';

import { navItems } from '@/lib/navItems';

interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  const router = useRouter();
  const isHome = router.pathname === '/';

  return (
    <div className="relative mx-auto max-w-lg md:max-w-md">
      <header>
        <Nav navItems={navItems} />
      </header>
      <main
        className={` h-main ${isHome ? 'mt-homeNavHeight' : 'mt-notHomeNavHeight p-pageMargin'} `}
      >
        {children}
      </main>
    </div>
  );
};

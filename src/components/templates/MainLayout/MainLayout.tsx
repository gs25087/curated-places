//@ts-nocheck

import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { Nav } from '@/components/molecules';

import { navItems } from '@/lib/navItems';

interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  const router = useRouter();
  const isHome = router.pathname === '/';
  const isAddPost = router.pathname === '/posts/add';
  const isLogin = router.pathname === '/login';
  const isProfile = router.pathname !== '/profile/edit' && router.pathname.startsWith('/profile/');

  return (
    <div className="relative mx-auto max-w-full md:max-w-md">
      <header>
        <Nav navItems={navItems} />
      </header>
      <main
        className={`  
        ${
          isHome || isProfile
            ? 'mt-homeNavHeight min-h-[theme(spacing.main)]' //h-main
            : 'mt-notHomeNavHeight min-h-[theme(spacing.notHomeMain)] px-pageMarginL py-pageMarginM'
        }  
        ${isAddPost || isLogin ? 'bg-primary' : ''} `}
      >
        {children}
      </main>
    </div>
  );
};

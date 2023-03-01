// import { useAuth } from '@/auth/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';

interface IProps {
  navItems: {
    label: string;
    href: string;
    icon: FunctionComponent<{ size: number }>;
    authRequired: boolean;
  }[];
}

export const Nav: FunctionComponent<IProps> = ({ navItems }): JSX.Element => {
  const router = useRouter();
  //const { authenticated } = useAuth();

  const isHome = router.pathname === '/';

  return (
    <nav className="bg-secondary-light dark:bg-secondary-dark fixed top-0 left-1/2 z-nav mx-auto flex w-full -translate-x-1/2 transform flex-wrap items-center justify-between  md:max-w-md">
      <div className="flex h-navHeight w-full justify-between px-pageMargin">
        <Link href={'/'}>
          <div className="text-highlight-light color-black flex items-center py-pageMargin pr-3 text-xl transition hover:scale-[0.98]">
            <div className="rounded-full bg-primary px-3 py-0.5 font-bold shadow-md">
              CU💎Ra💫T💕d
            </div>
          </div>
        </Link>
        <div className="py-pageMargin text-lg italic">
          <div className=" pr-3">Berlin</div>
        </div>
        <div className="flex justify-between">
          {navItems.map(
            (item) => (
              /*               (!item.authRequired || (authenticated && item.authRequired)) && (
               */ <Link key={item.href} href={item.href} className="flex items-center">
                <div className="text-highlight-light color-black flex items-center px-1 text-xl transition hover:scale-[0.98]">
                  <item.icon size={28} />
                </div>
              </Link>
            )
            /* ) */
          )}
        </div>
      </div>
    </nav>
  );
};

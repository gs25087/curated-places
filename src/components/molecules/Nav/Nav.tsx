import { useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { NavItem } from 'src/types/types';

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
  const user = useUser();
  const isHome = router.pathname === '/';

  return (
    <nav className="bg-secondary-light dark:bg-secondary-dark fixed top-0 left-1/2 z-nav mx-auto flex w-full -translate-x-1/2 transform flex-wrap items-center justify-between  bg-white md:max-w-md">
      <div className="flex h-navHeight w-full justify-between px-pageMargin">
        <Link href={'/'}>
          <div className="text-highlight-light color-black flex items-center py-pageMargin pr-3 text-xl transition hover:scale-[0.98]">
            <div className="rounded-full bg-primary px-3 py-0.5 font-bold shadow-md">
              Ar💎chi💫v💕e
            </div>
          </div>
        </Link>
        {/*   <div className="py-pageMargin text-lg italic">
          <div className=" pr-3">Berlin</div>
        </div> */}
        <div className="flex justify-between gap-x-2">
          {navItems.map(
            (item: NavItem) =>
              (!item.authRequired || (!!user && item.authRequired)) && (
                <Link
                  key={item.href}
                  href={item.href}
                  className="box-content flex h-logoHeight items-center py-pageMargin "
                >
                  <div className="text-highlight-light flex  items-center px-1 text-xl text-black transition hover:scale-[0.98]">
                    <item.icon size={30} weight="light" />
                  </div>
                </Link>
              )
          )}
        </div>
      </div>
    </nav>
  );
};

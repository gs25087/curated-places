import Link from 'next/link';
import { FunctionComponent } from 'react';

interface IProps {
  navItems: {
    label: string;
    href: string;
    authRequired: boolean;
  }[];
}

export const Nav: FunctionComponent<IProps> = (): JSX.Element => {
  return (
    <nav className="bg-secondary-light dark:bg-secondary-dark fixed top-0 left-1/2 z-nav mx-auto flex w-full -translate-x-1/2 transform flex-wrap items-center justify-between  bg-white md:max-w-md">
      <div className="flex h-navHeight w-full justify-between px-pageMargin">
        <Link href={'/'} className="whitespace-nowrap ">
          <div className="text-highlight-light color-black flex items-center py-pageMargin pr-3 text-xl transition hover:scale-[0.98]">
            <div className="rounded-full bg-primary px-3 py-0.5 font-medium shadow-md">
              Ar💎chi💫v💕e
            </div>
          </div>
        </Link>

        <div className="flex justify-between gap-x-2"></div>
      </div>
    </nav>
  );
};

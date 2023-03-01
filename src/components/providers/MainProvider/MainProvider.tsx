import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { AppProps } from 'next/app';
import { ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
  pageProps: AppProps['pageProps'];
}

// This is the place responsible for grouping all providers from the app

export const MainProvider = ({ children, pageProps }: Props) => {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      {children}
    </SessionContextProvider>
  );
};

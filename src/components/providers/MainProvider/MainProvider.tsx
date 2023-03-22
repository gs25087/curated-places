import { AppWrapper } from '@/context/MapContext/MapContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { AppProps } from 'next/app';
import { ReactNode, useState } from 'react';

import { muiTheme } from '@/lib/muiTheme';

const theme = createTheme(muiTheme);

interface Props {
  children: ReactNode;
  pageProps: AppProps['pageProps'];
}

export const MainProvider = ({ children, pageProps }: Props) => {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <ThemeProvider theme={theme}>
        <AppWrapper>{children}</AppWrapper>
      </ThemeProvider>
    </SessionContextProvider>
  );
};

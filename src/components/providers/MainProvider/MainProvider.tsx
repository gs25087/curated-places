import { AuthContextProvider } from '@/auth/useAuth';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'lib/apollo';
import { AppProps } from 'next/app';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  pageProps: AppProps['pageProps'];
}

// This is the place responsible for grouping all providers from the app

export const MainProvider = ({ children }: Props) => {
  const apolloClient = useApollo();

  return (
    <AuthContextProvider>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </AuthContextProvider>
  );
};

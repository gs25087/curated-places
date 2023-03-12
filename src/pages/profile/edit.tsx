import { useSession } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import { useEffect } from 'react';

import { Account } from '@/components/molecules';

export default function Edit() {
  const session = useSession();

  useEffect(() => {
    if (!session) {
      Router.push('/login');
    }
  }, [session]);

  return session && <Account />;
}

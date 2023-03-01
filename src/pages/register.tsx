import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';

import { Account } from '@/components/molecules';

const Register = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      {!session ? (
        <Auth /* providers={['facebook', 'google', 'apple']} */ supabaseClient={supabase} />
      ) : (
        <Account /* session={session} */ />
      )}
    </>
  );
};

export default Register;

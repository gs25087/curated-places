import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';

import buttonStyles from '@/styles/atoms/Button/Button.module.css';
import inputStyles from '@/styles/atoms/Input/Input.module.css';
import labelStyles from '@/styles/atoms/Label/Label.module.css';

import { Account } from '@/components/molecules';

const Register = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      {!session ? (
        <div className="auth-wrapper flex h-full items-center justify-around">
          <Auth
            supabaseClient={supabase}
            appearance={{
              style: {
                container: { width: '100%' }
              },
              className: {
                input: `${inputStyles.input}`,
                label: `${labelStyles.label}`,
                button: `${buttonStyles.button}`,
                anchor: 'text-xs'
              }
            }}
          />
        </div>
      ) : (
        <Account /* session={session} */ />
      )}
    </>
  );
};

export default Register;

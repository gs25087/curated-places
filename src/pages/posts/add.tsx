import { createServerSupabaseClient, Session, User } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';

import { PostForm } from '@/components/molecules/';

export default function Add({ user }: Session & { user: User }): JSX.Element {
  if (!user) return <div>Not authenticated</div>;

  return <PostForm />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };

  return {
    props: {
      initialSession: session,
      user: session.user
    }
  };
};

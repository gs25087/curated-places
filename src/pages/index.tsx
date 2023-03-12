import { useMapContext } from '@/context/MapContext/MapContext';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { GetServerSideProps, NextApiRequest, NextApiResponse, NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';

import { PostCard, TagBar } from '@/components/molecules/';
import { LocalitiesPopup } from '@/components/molecules/LocalitiesPopup.tsx';

// @ts-ignore
const HomePage: NextPage = ({ postData }) => {
  // @ts-ignore
  const { state } = useMapContext();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state?.tag]);

  return (
    <>
      <Head>
        <title>Curated Places</title>
        <meta name="description" content="Hand picked places" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {state?.openLocalitiesPopup && state?.localities.length > 0 && <LocalitiesPopup />}
      <div className="relative ">
        {state?.tags && state?.tags.length > 0 && <TagBar tags={state.tags} />}
        {postData.map((post: any) => {
          if (state && state?.tag)
            return (
              post?.tags?.includes(state.tag) && (
                <PostCard key={post.id} post={post} tags={post.tags} />
              )
            );

          return <PostCard key={post.id} post={post} tags={post.tags} />;
        })}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  // Run queries with RLS on the server
  const { data } = await supabase.from('posts').select('*');

  return {
    props: {
      postData: data ?? []
    }
  };
};

export default HomePage;

import { useMapContext } from '@/context/MapContext/MapContext';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { IPost } from 'src/types/types';

import { PostCard, TaxonomyBar } from '@/components/molecules/';
import { LocalitiesPopup } from '@/components/molecules/LocalitiesPopup.tsx';

import { taxonomyLevelNames } from '@/lib/taxonomy';

// @ts-ignore
const HomePage: NextPage = ({ postData }) => {
  // @ts-ignore
  const { state } = useMapContext();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state?.taxonomy.id]);

  return (
    <>
      <Head>
        <title>Curated Places</title>
        <meta name="description" content="Hand picked places" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {state?.openLocalitiesPopup && state?.localities.length > 0 && <LocalitiesPopup />}
      <div className="relative ">
        {state?.tax_suggestions && state?.tax_suggestions.length > 0 && <TaxonomyBar />}
        {postData.map((post: IPost) => (
          <PostCard
            key={post.id}
            post={post}
            category={post.category}
            subcategory={post.subcategory}
            subcategory_2={post.subcategory_2}
            subsubcategory={post.subsubcategory}
            subsubcategory_2={post.subsubcategory_2}
          />
        ))}
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

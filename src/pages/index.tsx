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
  const { categoryTree, subcategories } = state;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state?.taxonomy?.id]);

  const filterPosts = (posts: IPost[]) => {
    return posts.filter((post: IPost) => {
      if (
        state &&
        state.taxonomy.id &&
        state.taxonomy.level &&
        (state.locality === '' || post?.locality === state.locality)
      ) {
        const stateTaxonomyLevel = state.taxonomy.level as keyof typeof taxonomyLevelNames;
        const taxonomyName = taxonomyLevelNames[stateTaxonomyLevel] as string;

        return post[taxonomyName as keyof IPost] === state.taxonomy.id;
      } else if (!state.taxonomy.id && !state.taxonomy.level && state.locality !== '') {
        return post?.locality === state.locality;
      } else if (!state.taxonomy.id && !state.taxonomy.level && state.locality === '') {
        return true;
      }
    });
  };

  return (
    <>
      <Head>
        <title>Curated Places</title>
        <meta name="description" content="Hand picked places" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {state?.openLocalitiesPopup && state?.localities.length > 0 && <LocalitiesPopup />}
      <div className="relative ">
        {subcategories && categoryTree && <TaxonomyBar />}
        {filterPosts(postData).map((post: IPost) => (
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

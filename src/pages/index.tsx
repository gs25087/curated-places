import { AppWrapper, useMapContext } from '@/context/MapContext/MapContext';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { GetServerSideProps, NextApiRequest, NextApiResponse, NextPage } from 'next';
import Head from 'next/head';
import { ReactNode } from 'react';

import { PostCard, TagBar } from '@/components/molecules/';
import { MainLayout } from '@/components/templates/MainLayout';

import { getTagsFromCookies, ITag, setTagsToCookies } from '@/lib/tags';

// @ts-ignore
const HomePage: NextPage = ({ postData, tagData }) => {
  const { state } = useMapContext();

  //if (loading) return <div>Loading...</div>;
  //if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Head>
        <title>Curated Places</title>
        <meta name="description" content="Hand picked places" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative mb-32">
        {tagData && tagData.length > 0 && <TagBar tags={tagData} />}
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

//@ts-ignore
HomePage.getLayout = (page: ReactNode) => (
  <AppWrapper>
    <MainLayout>{page}</MainLayout>
  </AppWrapper>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const req = ctx.req as NextApiRequest;
  const res = ctx.res as NextApiResponse;

  const supabase = createServerSupabaseClient(ctx);

  async function fetchTags(): Promise<ITag[]> {
    const { data: tags } = await supabase.from('tags').select('*');

    //@ts-ignore
    return tags;
  }

  async function getTags(req: NextApiRequest, res: NextApiResponse): Promise<ITag[]> {
    let tags = getTagsFromCookies(req);
    if (!tags) {
      tags = await fetchTags();
      setTagsToCookies(res, tags);
    }

    return tags;
  }

  let tags: ITag[];

  // Get tags from cookies or fetch them from the server
  try {
    tags = await getTags(req, res);
  } catch (error) {
    console.error(error);
    tags = [];
  }

  // Run queries with RLS on the server
  const { data } = await supabase.from('posts').select('*');

  return {
    props: {
      postData: data ?? [],
      tagData: tags
    }
  };
};

export default HomePage;

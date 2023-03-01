import { AppWrapper, useMapContext } from '@/context/MapContext/MapContext';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import cookie from 'cookie';
import type { GetServerSideProps, NextApiRequest, NextApiResponse, NextPage } from 'next';
import Head from 'next/head';
import { ReactNode } from 'react';

import { PostCard, TagBar } from '@/components/molecules/';
import { MainLayout } from '@/components/templates/MainLayout';

import { getTagsFromCookies, ITag, setTagsToCookies } from '@/lib/tags';

// @ts-ignore
function parseCookies(req: { headers: { cookie } }) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}

// @ts-ignore
const HomePage: NextPage = ({ cookies, postData, tagData }) => {
  const { state } = useMapContext();
  const setCookie = (name: string, value: string, days: number) => {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    window.document.cookie = name + '=' + (value || '') + expires + '; path=/';
  };

  const handlePasswordChange = (e: any) => {
    if (e.target.value === process.env.NEXT_PUBLIC_PASSWORD) {
      setCookie('curated', e.target.value, 700);
      window.location.reload();
    }
  };

  //if (loading) return <div>Loading...</div>;
  //if (error) return <div>Error: {error.message}</div>;

  if (cookies.curated === undefined) {
    return (
      <div className="m-32 ml-8">
        Password
        <input
          type="password"
          className="ml-4 rounded border border-black"
          onChange={(e) => handlePasswordChange(e)}
        />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Curated Places</title>
        <meta name="description" content="Hand picked places" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative">
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
      </main>
    </div>
  );
};

//@ts-ignore
HomePage.getLayout = (page: ReactNode) => (
  <AppWrapper>
    <MainLayout>{page}</MainLayout>
  </AppWrapper>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // @ts-ignore
  const req = ctx.req as NextApiRequest;
  const res = ctx.res as NextApiResponse;

  //@ts-ignore
  const cookies = parseCookies(req);

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

  // Run queries with RLS on the server
  const { data: postData } = await supabase.from('posts').select('*');

  return {
    props: {
      initialSession: session,
      user: session.user,
      postData: postData ?? [],
      cookies,
      tagData: tags
    }
  };
};

export default HomePage;

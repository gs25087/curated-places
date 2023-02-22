import { gql, useQuery } from '@apollo/client';
// @ts-expect-error
import cookie from 'cookie';
import type { GetServerSideProps, NextApiRequest, NextPage } from 'next';
import Head from 'next/head';

// @ts-ig
function parseCookies(req: { headers: { cookie: any } }) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}

interface IPostData {
  id: number;
  title: string;
}

interface IPost {
  post: IPostData;
}

const POSTS_QUERY = gql`
  query Nod($after: Int, $first: Int) {
    posts(after: $after, first: $first) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        post {
          latitude
          longitude
          title
        }
      }
    }
  }
`;

// @ts-ignore
const HomePage: NextPage = ({ cookies }) => {
  const { data, loading, error } = useQuery(POSTS_QUERY);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (cookies.curated === undefined) {
    return (
      <div>
        <input
          type="password"
          className="m-10 mx-auto border"
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

      <main>
        <h1>Home page</h1>
        {data?.posts.edges.map((item: IPost) => (
          <div key={item.post.id}>
            <h2>{item.post.title}</h2>
          </div>
        ))}
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // @ts-ignore
  const cookies = parseCookies(req as NextApiRequest);

  // And then get element from cookie by name

  return {
    props: {
      cookies: cookies
    }
  };
};

export default HomePage;

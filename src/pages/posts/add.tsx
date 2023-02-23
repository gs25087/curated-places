import { loadIdToken } from '@/auth/firebaseAdmin';
import { useAuth } from '@/auth/useAuth';
import { GetServerSideProps, NextApiRequest } from 'next';

// import Layout from "src/components/layout";
// import PostForm from '@/components/organisms/postForm';

export default function Add() {
  const { authenticated } = useAuth();
  //const { data, loading, error } = useQuery(POSTS_QUERY);

  if (!authenticated) {
    return <div>Not authenticated</div>;
  }

  if (authenticated) return <div>Post add form</div>;
}

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const uid = await loadIdToken(req as NextApiRequest);

  if (!uid) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
  }

  return {
    props: {}
  };
};

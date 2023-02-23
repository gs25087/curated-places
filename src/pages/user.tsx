import { loadIdToken } from '@/auth/firebaseAdmin';
import { useAuth } from '@/auth/useAuth';
import { GetServerSideProps, NextApiRequest } from 'next';
import router from 'next/router';
import React from 'react';
/* import { gql, useQuery } from '@apollo/client';

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
					userId
          latitude
          longitude
          title
          image
          address
          id
          longitude
          latitude
          description
        }
      }
    }
  }
`; */

const User = () => {
  const { authenticated, user, logout } = useAuth();
  //const { data, loading, error } = useQuery(POSTS_QUERY);

  if (!authenticated) {
    return <div>Not authenticated</div>;
  }

  if (authenticated)
    return (
      <div>
        <h1 className="my-3">User Profile</h1>
        <h1 className="my-3">Hi, {user.email}</h1>
        <h1 className="my-6">Your posts will be displayed here</h1>
        <button
          className="mt-16 rounded border border-black p-2"
          onClick={() => {
            logout();
            router.push('/login');
          }}
        >
          Logout
        </button>
      </div>
    );
};

export default User;

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

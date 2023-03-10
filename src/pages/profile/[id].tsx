import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IUserPosts } from 'src/types/types';

import { PostCard } from '@/components/molecules';

import { supabase } from '@/lib/supabase';

export default function UserPosts({ user, posts }: IUserPosts) {
  const session = useSession();
  const supabase = useSupabaseClient();
  const userIsOwner = session?.user?.id === user.id;
  const [publicAvatarUrl, setPublicAvatarUrl] = useState<string>('');

  const getAvatarPublicUrl = async (filename: string) => {
    const {
      data: { publicUrl }
    } = supabase.storage.from('avatars').getPublicUrl(filename);
    setPublicAvatarUrl(publicUrl);
  };

  useEffect(() => {
    if (user.avatar_filename) {
      getAvatarPublicUrl(user.avatar_filename);
    }
  }, [user.avatar_filename]);

  return (
    <>
      <div className="mb-4 flex gap-x-4 px-pageMargin">
        <div>
          {publicAvatarUrl && (
            <Image
              src={publicAvatarUrl}
              priority
              alt="Avatar"
              className="block h-[6rem] w-[6rem] rounded-full object-cover shadow-lg"
              height={100}
              width={100}
            />
          )}
        </div>
        {userIsOwner && (
          <div>
            <h1 className="mb-2  font-medium">{`${user.first_name} ${user.last_name}`}</h1>
            <div className="text-sm">{`${posts.length} posts`}</div>
          </div>
        )}
      </div>
      <div className="mb-8 flex gap-x-4 px-pageMargin">
        <div className="w-1/2 rounded-lg bg-gray-100 p-3 text-center text-xs">Edit Profile</div>
        <div className="w-1/2 rounded-lg bg-gray-100 p-3 text-center text-xs">Share Profile</div>
      </div>
      <div className="mb-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} tags={post.tags} />
        ))}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  // Fetch a list of all users from the "profiles" table
  const { data: users, error } = await supabase.from('profiles').select('id');

  // Generate a static path for each user
  const paths = users?.map((user) => ({
    params: { id: user.id.toString() }
  }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;

  if (!id) {
    return { notFound: true };
  }

  // Fetch the user's data from the "profiles" table
  const { data: user, error: userError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  // Fetch the user's posts from the "posts" table
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('*')
    .eq('author', id);

  return { props: { user, posts } };
};

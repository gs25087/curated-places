import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IUserPosts } from 'src/types/types';

import { PostCard } from '@/components/molecules';

import { supabase } from '@/lib/supabase';

export default function UserPosts({ user, posts }: IUserPosts) {
  const session = useSession();
  const supabase = useSupabaseClient();
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
        {publicAvatarUrl && (
          <Image
            src={publicAvatarUrl}
            priority
            alt="Avatar"
            className="ml-2 block h-[6rem] w-[6rem] rounded-full object-cover shadow-lg
              "
            height={100}
            width={100}
          />
        )}

        <div>
          <h1 className="  font-medium">{`${user.first_name} ${user.last_name}`}</h1>
          <div className=" text-sm">{`${posts.length} post${posts.length > 1 ? 's' : ''} `}</div>

          {session?.user?.id === user.id && (
            <Link
              className="mt-6 block w-fit rounded-lg bg-gray-100 px-3 py-1 text-center text-xs"
              href="/profile/edit"
            >
              Edit Profile
            </Link>
          )}
        </div>
      </div>

      <div className="mb-4">
        {posts.map((post) => (
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

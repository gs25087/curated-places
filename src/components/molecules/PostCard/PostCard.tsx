import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BookmarkSimple } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { IAuthor, IPostCardProps } from 'src/types/types';

import { TaxonomyButton } from '@/components/atoms/TaxonomyButton';

import { useTaxonomies } from '@/lib/useTaxonomies';

import { PlacePhotos } from '../PlacePhotos';

export const PostCard = ({
  post,
  category,
  subcategory,
  subcategory_2,
  subsubcategory,
  subsubcategory_2
}: IPostCardProps) => {
  const photos = post.photos ? JSON.parse(post.photos) : null;
  //const supabase = useSupabaseClient();
  const router = useRouter();
  //const isProfile = router.pathname.startsWith('/profile/');

  const [postTaxonomyItem, setPostTaxonomyItem] = useState<{
    id: number | null;
    level: number | null;
  }>({ id: null, level: null });

  useEffect(() => {
    let level, id;

    if (subsubcategory) {
      level = 2;
      id = subsubcategory;
    } else if (subcategory) {
      level = 1;
      id = subcategory;
    } else {
      level = null;
      id = null;
    }

    const taxItem = { id, level };

    setPostTaxonomyItem(taxItem);
  }, []);

  const { label, level, id } = useTaxonomies(postTaxonomyItem);
  /*   const [author, setAuthor] = useState<string>('');

  async function fetchAuthorName() {
    const { data } = await supabase.from('profiles').select('*').eq('id', post.author).single();

    const { first_name, last_name } = data as IAuthor;
    setAuthor(`${first_name} ${last_name}`);
  }

  useEffect(() => {
    fetchAuthorName();
  }, []); */

  return (
    <div key={post.id} className={`w-full border-b-4 last:mb-32 last:border-b-0`}>
      <div className=" p-pageMargin">
        <div className="w-full rounded-lg  object-cover py-0.5">
          {photos ? (
            <PlacePhotos photoUrls={photos} />
          ) : (
            <div className="h-32 w-full rounded-lg bg-primary-LIGHT"></div>
          )}
        </div>

        <div className="flex justify-between pt-1.5">
          <h1 className="mb-0.5 w-3/5 font-medium">{post.title}</h1>
          <div className="flex w-2/5 items-start justify-end ">
            {label && level && id && (
              <TaxonomyButton size={'small'} label={label} level={level} id={id} />
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-end">
          <div className="w-4/6 text-xs text-gray-500">{post.description}</div>
          <div className=" flex w-2/6 flex-col items-end text-right text-2xs text-black underline">
            <div className="mb-2 hidden text-right text-gray-400">
              <BookmarkSimple size={20} weight="light" />
            </div>
            {/*             {!isProfile && <Link href={`/profile/${post.author}`}>{author}</Link>}
             */}{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

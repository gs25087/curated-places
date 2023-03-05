import { BookmarkSimple } from 'phosphor-react';
import React from 'react';
import { IPostCardProps } from 'src/types/types';

import { Tag } from '@/components/atoms/Tag';

import { PlacePhotos } from '../PlacePhotos';

export const PostCard = ({ post, tags }: IPostCardProps) => {
  const photos = post.photos ? JSON.parse(post.photos) : null;

  return (
    <div key={post.id} className={`w-full border-b-4 last:border-b-0`}>
      <div className=" p-4">
        <div className="w-full rounded-lg  object-cover py-0.5">
          {photos ? (
            <PlacePhotos photoUrls={photos} />
          ) : (
            <div className="h-32 w-full rounded-lg bg-primary-LIGHT"></div>
          )}
        </div>

        <div className="flex justify-between pt-1.5">
          <h1 className="w-3/5 font-medium leading-3">{post.title}</h1>
          {tags && tags.length > 0 && (
            <div className="flex w-2/5 items-start justify-end ">
              {tags.map((tagId) => (
                <Tag key={tagId} id={tagId} size="xs" />
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-end">
          <div className="  w-4/6 text-xs text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa rem doloremque adipisci
            nam ipsa! Nihil.
          </div>
          <div className=" flex w-2/6 flex-col items-end text-right text-2xs text-black underline">
            <div className="mb-2 hidden text-right text-gray-400">
              <BookmarkSimple size={20} weight="light" />
            </div>
            Gintare Simutyte
          </div>
        </div>
      </div>
    </div>
  );
};

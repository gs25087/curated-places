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
        <h1 className="text-lg">{post.title}</h1>
        {tags && tags.length > 0 && (
          <div className="flex items-start justify-end py-2">
            {tags.map((tagId) => (
              <Tag key={tagId} id={tagId} size="xs" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

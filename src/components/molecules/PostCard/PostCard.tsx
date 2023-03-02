// @ts-nocheck
import { Image } from 'cloudinary-react';
import { NexusGenFieldTypeNames } from 'nexus-typegen';
import React from 'react';

import { Tag } from '@/components/atoms/Tag';

interface IProps {
  post: NexusGenFieldTypeNames['Post'];
  // setSelected: (post: NexusGenFieldTypeNames['Post'] | null) => void;
  // selected: NexusGenFieldTypeNames['Post'] | null;
  tags: number[];
}

export const PostCard = ({ post, tags }: IProps) => (
  <div key={post.id} className={`w-full py-pageMargin`}>
    <div className="p-4 ">
      {/* rounded-lg shadow-lg */}
      <h2 className="text-xl">{post.title}</h2>
      <div className="h-32 max-h-48 w-full rounded-lg bg-primary-100 object-cover"></div>

      <div className="flex items-start justify-end py-2">
        {tags && tags.length > 0 && tags.map((tagId) => <Tag key={tagId} id={tagId} />)}
      </div>
    </div>
  </div>
);

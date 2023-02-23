// @ts-nocheck
import { Image } from 'cloudinary-react';
import { NexusGenFieldTypeNames } from 'nexus-typegen';
import React from 'react';

import { Tag } from '@/components/atoms/Tag';

interface IProps {
  post: NexusGenFieldTypeNames['Post'];
  setSelected: (post: NexusGenFieldTypeNames['Post'] | null) => void;
  selected: NexusGenFieldTypeNames['Post'] | null;
}

export const PostCard = ({ post, selected, category }: IProps) => (
  <div
    key={post.id}
    className={`w-full py-pageMargin ${selected?.id === post.id ? 'bg-lime-400' : ' '}`}
  >
    <div className="p-4 ">
      {/* rounded-lg shadow-lg */}
      <h2 className="text-xl">Lorem Ipsum</h2>
      <Image
        className="max-h-48 w-full rounded-lg object-cover"
        cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
        publicId={post.image}
        secure
        dpr="auto"
        quality="auto"
        width={350}
        height={Math.floor((9 / 16) * 350)}
        crop="fill"
        gravity="auto"
        alt={post.title}
      />
      <div className="flex items-start justify-between py-2">
        <div className="mr-pageMargin text-sm">Lorem ipsum short description um short desc</div>

        <Tag label={category.label} border={true} />
      </div>
    </div>
  </div>
);

import { FC } from 'react';

import { Tag } from '@/components/atoms';

interface IProps {
  tags: { id: number; label: string }[];
}

export const TagBar: FC<IProps> = ({ tags }) => {
  return (
    <div className="no-scrollbar fixed -translate-y-full  transform overflow-x-auto md:max-w-md">
      <div className="mt-2 flex  px-pageMargin pb-3">
        {tags &&
          tags.length > 0 &&
          tags.map((tag) => <Tag shadow={true} key={tag.label} filter={true} id={tag.id} />)}
      </div>
    </div>
  );
};

import { FC } from 'react';

import { Tag } from '@/components/atoms';

interface IProps {
  tags: { id: number; label: string }[];
}

export const TagBar: FC<IProps> = ({ tags }) => {
  return (
    <div className="no-scrollbar max-w-s fixed   h-[2.3rem] w-full -translate-y-full transform overflow-x-auto px-[1px] before:absolute before:top-0 before:h-3 before:w-full before:bg-white before:content-[''] md:max-w-md">
      <div className="absolute  flex px-pageMargin pb-3">
        {tags &&
          tags.length > 0 &&
          tags.map((tag) => <Tag key={tag.label} filter={true} id={tag.id} />)}
      </div>
    </div>
  );
};

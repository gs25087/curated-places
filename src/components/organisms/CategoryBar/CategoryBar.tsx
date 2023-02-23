import { Tag } from '@/components/atoms/Tag';

import { categories } from '@/lib/categories';

export const CategoryBar = () => {
  return (
    <div className="no-scrollbar w-full overflow-x-auto">
      <div className="mt-2 flex  px-pageMargin pb-3">
        {categories.map((category) => (
          <Tag
            label={category.label}
            shadow={true}
            key={category.label}
            filter={true}
            id={category.id}
          />
        ))}
      </div>
    </div>
  );
};

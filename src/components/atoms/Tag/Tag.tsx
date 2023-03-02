import { useMapContext } from '@/context/MapContext/MapContext';
import { ACTIONS } from '@/context/MapContext/MapReducer';
import cookie from 'cookie';
import { ReactElement, useEffect, useState } from 'react';

import { TAGS_KEY } from '@/lib/tags';

interface IProps {
  shadow?: boolean;
  icon?: ReactElement;
  size?: string;
  filter?: boolean;
  id: number;
}

type Padding = {
  [key: string]: string;
};

interface Tag {
  id: number;
  label: string;
  created_at: string;
  posts: number[];
}

const padding: Padding = {
  sm: 'px-2.5 py-0.25',
  md: 'px-3 py-0.5',
  lg: 'px-3.5 py-0.75'
};

export const Tag = ({ shadow, icon, size, id, filter }: IProps): JSX.Element => {
  const { state, dispatch } = useMapContext();
  const [tagItem, setTagItem] = useState<Tag>();
  useEffect(() => {
    // This code will only run client-side
    const tagsCookie = cookie.parse(document.cookie)[TAGS_KEY];
    const tagItems = JSON.parse(tagsCookie);
    //@ts-ignore
    const tag: Tag = Object.values(tagItems).find((tag: Tag) => {
      return tag.id === id;
    });
    setTagItem(tag);
  }, []);

  return (
    <div
      className={`py-0.25 mr-0.5 flex items-center  gap-x-1 overflow-hidden whitespace-nowrap rounded-full border border-black  px-2.5 shadow-md transition-colors last:mr-0
				${size ? padding[size] : padding['sm']}
				text-${size ? size : 'sm'}  
				${filter ? 'cursor-pointer' : ''} 
        ${state.tag === id ? 'bg-primary-LIGHT' : 'bg-white'} `}
      onClick={() => {
        if (filter) {
          if (state.tag === id) {
            dispatch({ type: ACTIONS.SET_TAG, payload: null });
          } else {
            dispatch({ type: ACTIONS.SET_TAG, payload: id });
          }
        }
      }}
    >
      {tagItem?.label}
      {icon}
    </div>
  );
};

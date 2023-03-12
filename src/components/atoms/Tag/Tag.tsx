import { useMapContext } from '@/context/MapContext/MapContext';
import { ACTIONS } from '@/context/MapContext/MapReducer';
import { ReactElement, useEffect, useState } from 'react';
import { IMapContext } from 'src/types/types';

interface IProps {
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
  xs: 'px-1.5 py-0.15',
  sm: 'px-2.5 py-0.25',
  md: 'px-3 py-0.5',
  lg: 'px-3.5 py-0.75'
};

export const Tag = ({ icon, size = 'sm', id, filter }: IProps): JSX.Element => {
  //@ts-ignore
  const { state, dispatch } = useMapContext<IMapContext>();

  const [tagItem, setTagItem] = useState<Tag>();
  useEffect(() => {
    const tags = state?.tags;
    const tag: Tag = tags?.find((tag: Tag) => {
      return tag.id === id;
    });
    setTagItem(tag);
  }, [state?.tags]);

  return (
    <>
      {tagItem && tagItem?.label && (
        <div
          className={`py-0.25 mr-0.5 flex items-center  gap-x-1 overflow-hidden whitespace-nowrap rounded-full border border-black  px-2.5 shadow transition-colors last:mr-0
				${size ? padding[size] : padding['sm']}
				text-${size ? size : 'sm'}  
				${filter ? 'cursor-pointer' : ''} 
        ${state?.tag === id ? 'bg-primary-LIGHT' : 'bg-white'} `}
          onClick={() => {
            if (filter) {
              if (state?.tag === id) {
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
      )}
    </>
  );
};

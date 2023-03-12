import { useMapContext } from '@/context/MapContext/MapContext';
import { ACTIONS } from '@/context/MapContext/MapReducer';
import { useEffect, useState } from 'react';

export const LocalitiesPopup = () => {
  const [localities, setLocalities] = useState<string[]>([]);

  // @ts-ignore
  const { state, dispatch } = useMapContext();

  useEffect(() => {
    const localities = state.localities;
    setLocalities(localities);
  }, [state.localities]);

  return (
    <div
      className="fixed top-0 left-0 z-[60] flex h-screen w-full items-center justify-around overscroll-contain bg-primary/70 p-pageMarginL backdrop-blur-sm backdrop-opacity-10"
      onClick={(e) => {
        //@ts-ignore
        !e.target.classList.contains('locality') &&
          dispatch({ type: ACTIONS.OPEN_LOCALITIESPOPUP, payload: false });
      }}
    >
      <div className="grid grid-cols-2 rounded-2xl  text-center ">
        {localities.map((locality: string) => (
          <div key={locality} className="p-2">
            <div
              className="py-0.25 locality mr-0.5 cursor-pointer rounded-full border border-black  bg-white px-2.5 text-center shadow transition-colors last:mr-0"
              onClick={() => {
                dispatch({ type: ACTIONS.OPEN_LOCALITIESPOPUP, payload: false });
              }}
            >
              {locality}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import { useMapContext } from '@/context/MapContext/MapContext';
import { ACTIONS } from '@/context/MapContext/MapReducer';
import { Tag } from 'phosphor-react';
import { useState } from 'react';

export const CityPopup = () => {
  const [city, setCity] = useState<string[]>([
    'Berlin',
    'Vilnius',
    'Tulum',
    'Bali',
    'Copenhagen',
    'Istanbul',
    'Lisbon',
    'London',
    'Los Angeles',
    'New York',
    'Seoul',
    'Paris',
    'Venice',
    'Vienna'
  ]);

  const { dispatch } = useMapContext();

  return (
    <div
      className="fixed top-0 left-0 z-[60] flex h-screen w-full items-center justify-around overscroll-contain bg-primary/70 p-pageMarginL backdrop-blur-sm backdrop-opacity-10"
      onClick={(e) => {
        //@ts-ignore
        !e.target.classList.contains('city') &&
          dispatch({ type: ACTIONS.OPEN_CITYPOPUP, payload: false });
      }}
    >
      <div className="grid grid-cols-2 rounded-2xl  text-center ">
        {city.map((city: string) => (
          <div key={city} className="p-2">
            <div className="py-0.25 city mr-0.5 rounded-full border border-black bg-white  px-2.5 text-center shadow transition-colors last:mr-0">
              {city}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

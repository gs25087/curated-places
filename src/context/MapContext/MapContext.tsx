import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

import { ACTIONS, initialState, MapReducer } from './MapReducer';

//@ts-ignore
const MapContext = createContext();

export function AppWrapper({ children }: { children: React.ReactNode }) {
  //@ts-ignore
  const [state, dispatch] = useReducer(MapReducer, initialState);
  const supabase = useSupabaseClient();

  const user = useUser();

  useEffect(() => {
    const fetchUserLocality = async () => {
      const { data, error, status } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) {
        console.error(error);

        return;
      }
      //@ts-ignore
      dispatch({ type: ACTIONS.SET_LOCALITY, payload: data });
    };

    if (user?.id) {
      fetchUserLocality();
    } else {
      //@ts-ignore
      dispatch({ type: ACTIONS.SET_LOCALITY, payload: '' });
    }
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      const { data, error } = await supabase.from('tags').select('*');

      if (error) {
        console.error(error);

        return;
      }
      //@ts-ignore
      dispatch({ type: ACTIONS.SAVE_TAGS, payload: data });
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      const { data, error } = await supabase.from('posts').select('locality');

      if (error) {
        console.error(error);

        return;
      }

      if (data) {
        const localities = data.map((item: { locality: string }) => item.locality);
        const uniqueLocalities = localities.filter((value, index, array) => {
          return array.indexOf(value) === index;
        });

        //@ts-ignore
        dispatch({ type: ACTIONS.SAVE_LOCALITIES, payload: uniqueLocalities });
      }
    };

    fetchTags();
  }, []);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>;
}

export function useMapContext() {
  return useContext(MapContext);
}

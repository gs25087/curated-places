import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { CategoryTree } from 'src/types/taxonomy/taxonomy';
import { ICategory, ISubCategory, ISubSubCategory } from 'src/types/types';

import { generateCategoryTree } from '@/lib/helpers';

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
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) {
        console.error(error);

        return;
      }
      //@ts-ignore
      dispatch({ type: ACTIONS.SET_LOCALITY, payload: data.locality });
    };

    if (user?.id) {
      fetchUserLocality();
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*');

      if (error) {
        console.error(error);

        return;
      }
      //@ts-ignore
      dispatch({ type: ACTIONS.SAVE_CATEGORIES, payload: data });

      return data;
    };
    const fetchSubcategories = async () => {
      const { data, error } = await supabase.from('subcategories').select('*');

      if (error) {
        console.error(error);

        return;
      }
      //@ts-ignore
      dispatch({ type: ACTIONS.SAVE_SUBCATEGORIES, payload: data });

      return data;
    };

    const fetchSubsubcategories = async () => {
      const { data, error } = await supabase.from('subsubcategories').select('*');

      if (error) {
        console.error(error);

        return;
      }
      //@ts-ignore
      dispatch({ type: ACTIONS.SAVE_SUBSUBCATEGORIES, payload: data });

      return data;
    };

    const fetchTaxSuggestions = async () => {
      const { data, error } = await supabase.from('tax_suggestions').select('*');

      if (error) {
        console.error(error);

        return;
      }
      //@ts-ignore
      dispatch({ type: ACTIONS.SAVE_TAX_SUGGESTIONS, payload: data });
    };

    const fetchLocalities = async () => {
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

    fetchLocalities();

    Promise.all([fetchCategories(), fetchSubcategories(), fetchSubsubcategories()])
      .then(([categories, subcategories, subsubcategories]) => {
        const categoryTree: CategoryTree = generateCategoryTree(
          categories as ICategory[],
          subcategories as ISubCategory[],
          subsubcategories as ISubSubCategory[]
        );
        //@ts-ignore
        dispatch({ type: ACTIONS.SAVE_CATEGORY_TREE, payload: categoryTree });
      })
      .catch((error) => console.error('Error creating nested object:', error));
    fetchTaxSuggestions();
  }, []);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>;
}

export function useMapContext() {
  return useContext(MapContext);
}

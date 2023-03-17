import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import { Action, IMapContext, ITag } from 'src/types/types';

export const ACTIONS = {
  SET_TAG: 'SET_TAG',
  SAVE_TAGS: 'SAVE_TAGS',
  SAVE_LOCALITIES: 'SAVE_LOCALITIES',
  OPEN_LOCALITIESPOPUP: 'OPEN_LOCALITIESPOPUP',
  SET_LOCALITY: 'SET_LOCALITY'
};

export const initialState = {
  tag: null,
  openLocalitiesPopup: false,
  tags: [],
  localities: [],
  locality: ''
};

export const MapReducer = (state: IMapContext, action: Action) => {
  switch (action.type) {
    case ACTIONS.SET_TAG: {
      return {
        ...state,
        tag: action.payload
      };
    }
    case ACTIONS.OPEN_LOCALITIESPOPUP: {
      return {
        ...state,
        openLocalitiesPopup: action.payload
      };
    }
    case ACTIONS.SAVE_TAGS: {
      return {
        ...state,
        tags: action.payload
      };
    }
    case ACTIONS.SAVE_LOCALITIES: {
      return {
        ...state,
        localities: action.payload
      };
    }
    case ACTIONS.SET_LOCALITY: {
      return {
        ...state,
        locality: action.payload
      };
    }
  }
};

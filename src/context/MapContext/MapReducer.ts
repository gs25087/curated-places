import { Action, IMapContext, ITag } from 'src/types/types';

export const ACTIONS = {
  SET_TAG: 'SET_TAG',
  SAVE_TAGS: 'SAVE_TAGS',
  SAVE_LOCALITIES: 'SAVE_LOCALITIES',
  OPEN_LOCALITIESPOPUP: 'OPEN_LOCALITIESPOPUP'
};

export const initialState = {
  tag: null,
  openLocalitiesPopup: false,
  tags: [],
  localities: []
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
  }
};

import { IMapContext } from 'src/types/types';

interface IAction {
  type: string;
  payload: number | null;
}

export const initialState = {
  tag: null,
  openCityPopup: false
};

export const MapReducer = (state: IMapContext, action: IAction) => {
  switch (action.type) {
    case ACTIONS.SET_TAG: {
      return {
        ...state,
        tag: action.payload
      };
    }
    case ACTIONS.OPEN_CITYPOPUP: {
      return {
        ...state,
        openCityPopup: action.payload
      };
    }
  }
};

export const ACTIONS = {
  SET_TAG: 'SET_TAG',
  OPEN_CITYPOPUP: 'OPEN_CITYPOPUP'
};

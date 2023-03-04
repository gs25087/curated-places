import { boolean } from 'yup';

interface IAction {
  type: string;
  payload: number | null;
}

export const initialState = {
  tag: null,
  openCityPopup: boolean
};

export const MapReducer = (state: { tag: number }, action: IAction) => {
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

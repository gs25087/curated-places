interface IAction {
  type: string;
  payload: number | null;
}

export const initialState = {
  tag: null
};

export const MapReducer = (state: { tag: number }, action: IAction) => {
  switch (action.type) {
    case ACTIONS.SET_TAG: {
      return {
        ...state,
        tag: action.payload
      };
    }
  }
};

export const ACTIONS = {
  SET_TAG: 'SET_TAG'
};

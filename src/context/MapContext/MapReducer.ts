interface IAction {
  type: string;
  payload: number;
}

export const initialState = {
  category: null
};

export const MapReducer = (state: { category: number }, action: IAction) => {
  switch (action.type) {
    case ACTIONS.SET_CATEGORY: {
      return {
        ...state,
        category: action.payload
      };
    }
  }
};

export const ACTIONS = {
  SET_CATEGORY: 'SET_CATEGORY'
};

import { Action, IMapContext } from 'src/types/types';

export const ACTIONS = {
  SET_TAXONOMY: 'SET_TAXONOMY',
  SAVE_CATEGORIES: 'SAVE_CATEGORIES',
  SAVE_SUBCATEGORIES: 'SAVE_SUBCATEGORIES',
  SAVE_SUBSUBCATEGORIES: 'SAVE_SUBSUBCATEGORIES',
  SAVE_TAX_SUGGESTIONS: 'SAVE_TAX_SUGGESTIONS',
  SAVE_TYPES: 'SAVE_TYPES',
  SAVE_LOCALITIES: 'SAVE_LOCALITIES',
  OPEN_LOCALITIESPOPUP: 'OPEN_LOCALITIESPOPUP',
  SET_LOCALITY: 'SET_LOCALITY',
  SAVE_CATEGORY_TREE: 'SAVE_CATEGORY_TREE'
};

export const initialState = {
  taxonomy: { level: null, id: null },
  openLocalitiesPopup: false,
  categories: [],
  subcategories: [],
  subsubcategories: [],
  categoryTree: [],
  localities: [],
  locality: ''
};

export const MapReducer = (state: IMapContext, action: Action) => {
  switch (action.type) {
    case ACTIONS.SET_TAXONOMY: {
      return {
        ...state,
        taxonomy: action.payload
      };
    }
    case ACTIONS.OPEN_LOCALITIESPOPUP: {
      return {
        ...state,
        openLocalitiesPopup: action.payload
      };
    }
    case ACTIONS.SAVE_CATEGORIES: {
      return {
        ...state,
        categories: action.payload
      };
    }
    case ACTIONS.SAVE_SUBCATEGORIES: {
      return {
        ...state,
        subcategories: action.payload
      };
    }
    case ACTIONS.SAVE_SUBSUBCATEGORIES: {
      return {
        ...state,
        subsubcategories: action.payload
      };
    }
    case ACTIONS.SAVE_LOCALITIES: {
      return {
        ...state,
        localities: action.payload
      };
    }
    case ACTIONS.SAVE_TAX_SUGGESTIONS: {
      return {
        ...state,
        tax_suggestions: action.payload
      };
    }
    case ACTIONS.SET_LOCALITY: {
      return {
        ...state,
        locality: action.payload
      };
    }
    case ACTIONS.SAVE_CATEGORY_TREE: {
      return {
        ...state,
        categoryTree: action.payload
      };
    }
  }
};

import { createContext, useContext, useMemo, useReducer } from 'react';

import { initialState, MapReducer } from './MapReducer';

//@ts-ignore
const MapContext = createContext<any>();

export function AppWrapper({ children }: { children: React.ReactNode }) {
  //@ts-ignore
  const [state, dispatch] = useReducer(MapReducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>;
}

export function useMapContext() {
  return useContext(MapContext);
}

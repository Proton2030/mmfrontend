import initialState from './store';
import actions from './actions';
import reducer from './reducer';
import { useCallback, useEffect, useReducer } from 'react';
import { ContextProviderProps } from '../context.types';
import RedirectContext from './redirectContext';

const RedirectContextProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    hasRedirected: state.hasRedirected,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setHasRedirected: useCallback(
      (hasRedirected: boolean) => dispatch({ type: actions.SET_REDIRECTION, payload: { ...state, hasRedirected } }),
      [],
    ),
  };

  return <RedirectContext.Provider value={value}>{children}</RedirectContext.Provider>;
};

export default RedirectContextProvider;

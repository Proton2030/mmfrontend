import React, { createContext, useReducer, Dispatch, useState, useEffect, useCallback } from 'react';
import reducer from './reducer';
import initialState from './store';
import actions from './action';
import UiContext from './UIContext';
import { IUiVal } from '../../@types/types/ui.types';

// type UiContextType = {
//   state: Store;
//   dispatch: Dispatch<UiAction>;
// };

export const UiContextProvider: React.FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    ui: state.ui,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setUi: useCallback((ui: IUiVal) => dispatch({ type: actions.SET_UI, payload: { ...state, ui } }), []),
  };
  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};

export default UiContextProvider;

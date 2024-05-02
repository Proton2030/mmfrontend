import React, { useReducer, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducer from './reducer';
import initialState from './store';
import actions from './action';
import UiContext from './UIContext';
import { IUiVal } from '../../@types/types/ui.types';

export const UiContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Function to fetch UI settings from local storage
  const fetchUiFromStorage = useCallback(async () => {
    try {
      const storedData = await AsyncStorage.getItem('@ui');
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        dispatch({ type: actions.SET_UI, payload: { ...state, ui: parsedData } });
      }
    } catch (error) {
      console.error('Error fetching UI settings from storage:', error);
    }
  }, [dispatch]);

  // Fetch the UI settings from local storage when the component mounts
  useEffect(() => {
    fetchUiFromStorage();
  }, [fetchUiFromStorage]);

  const value = {
    ui: state.ui,
    setUi: useCallback((ui: IUiVal) => dispatch({ type: actions.SET_UI, payload: { ...state, ui } }), []),
  };

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};

export default UiContextProvider;

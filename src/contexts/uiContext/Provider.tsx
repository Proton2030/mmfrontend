import React, { useReducer, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducer from './reducer';
import initialState from './store';
import actions from './action';
import UiContext from './UIContext';
import { IUiVal } from '../../@types/types/ui.types';
import { getAppThemeMode } from '../../utils/commonFunction/getAppThemeMode';

export const UiContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Function to fetch UI settings from local storage
  const fetchUiFromStorage = useCallback(async () => {
    try {
      const storedData = await AsyncStorage.getItem('@ui');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        dispatch({ type: actions.SET_UI, payload: { ...state, ui: parsedData } });
      } else {
        // If no data is found in storage, set the default UI settings
        dispatch({
          type: actions.SET_UI,
          payload: { ...state, ui: { ...initialState.ui, theme: getAppThemeMode() === 'dark' ? 'DARK' : 'LIGHT' } },
        });
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

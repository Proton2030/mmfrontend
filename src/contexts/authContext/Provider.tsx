import initialState from './store';
import actions from './actions';
import reducer from './reducer';
import { useCallback, useEffect, useReducer } from 'react';
import AuthContext from './authContext';
import { ContextProviderProps } from '../context.types';
import { IUserDetails } from '../../@types/types/userDEtails.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../utils/api';

const AuthContextProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    user: state.user,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setUser: useCallback(
      (user: IUserDetails | null) => dispatch({ type: actions.SET_USER, payload: { ...state, user } }),
      [],
    ),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

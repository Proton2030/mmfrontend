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

  const fetchUserFromUserId = useCallback(async () => {
    // ... [same content as above]
    try {
      const storeUserId = await AsyncStorage.getItem('@userId');
      console.log('===>userid', storeUserId);
      const userDetails = await api.userDetails.getUserInfo({ userObjectId: storeUserId });
      if (userDetails) {
        dispatch({ type: actions.SET_USER, payload: { ...state, user: userDetails } });
      }
    } catch (error) {
      console.error('Error fetching user from storage:', error);
    }
  }, [dispatch]);

  const value = {
    user: state.user,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setUser: useCallback(
      (user: IUserDetails | null) => dispatch({ type: actions.SET_USER, payload: { ...state, user } }),
      [],
    ),
  };

  useEffect(() => {
    fetchUserFromUserId();
  }, [fetchUserFromUserId]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

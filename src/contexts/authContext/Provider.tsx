import initialState from './store';
import actions from './actions';
import reducer from './reducer';
import { useCallback, useEffect, useReducer } from 'react';
import AuthContext from './authContext';
import { ContextProviderProps } from '../context.types';
import { IUserDetails } from '../../@types/types/userDEtails.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContextProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUserFromStorage = useCallback(async () => {
    // ... [same content as above]
    try {
      const storedData = await AsyncStorage.getItem('@user');
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        // Convert string numbers back to numbers
        const userWithNumbers = {
          ...parsedData,
          age: parseInt(parsedData.age, 10),
          height: parseInt(parsedData.height, 10),
          weight: parseInt(parsedData.weight, 10),
          no_of_brothers: parseInt(parsedData.no_of_brothers, 10),
          no_of_sisters: parseInt(parsedData.no_of_sisters, 10),
          total_family_member: parseInt(parsedData.total_family_member, 10),

          partner_min_age: parseInt(parsedData.partner_min_age, 10),
          partner_max_age: parseInt(parsedData.partner_max_age, 10),
          partner_min_height: parseInt(parsedData.partner_min_height, 10),
          partner_min_weight: parseInt(parsedData.partner_min_weight, 10),
          partner_max_weight: parseInt(parsedData.partner_max_weight, 10),
          // ... other fields
        };

        // Dispatch the user to update the state
        dispatch({ type: actions.SET_USER, payload: { ...state, user: userWithNumbers } });
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
    fetchUserFromStorage();
  }, [fetchUserFromStorage]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

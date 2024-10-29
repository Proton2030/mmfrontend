import { createContext } from 'react';
import { RedirectContextProps } from '../../@types/contexts/redirectContext/redirectContextProps.types';

const RedirectContext = createContext({} as RedirectContextProps);

export default RedirectContext;

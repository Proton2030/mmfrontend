import { createContext } from 'react';
import { IUiContextProps } from '../../@types/contexts/uiContext/uiContextProps.types';

const UiContext = createContext({} as IUiContextProps);

export default UiContext;

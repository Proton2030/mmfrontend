import { IUiVal } from '../../types/ui.types';

export interface IUiContextProps {
  ui: IUiVal;
  setUi: (ui: IUiVal) => void;
}

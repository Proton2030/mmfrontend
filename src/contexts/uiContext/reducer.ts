import { Store } from '../../@types/contexts/uiContext/store.types';
import { UiAction } from '../../@types/contexts/uiContext/uiAction.types';
import { IUiVal } from '../../@types/types/ui.types';
import actions from './action';

const reducer = (state: Store, action: UiAction): Store => {
  switch (action.type) {
    case actions.SET_UI: {
      const { ui } = action.payload as { ui: IUiVal };
      return {
        ...state,
        ui,
      };
    }
    default:
      throw new Error('Unexpected action in ChoiceListContext reducer.');
  }
};

export default reducer;

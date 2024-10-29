import { RedirectAction } from '../../@types/contexts/redirectContext/redirectAction.types';
import { Store } from '../../@types/contexts/redirectContext/store.types';
import actions from './actions';

const reducer = (state: Store, action: RedirectAction) => {
  switch (action.type) {
    case actions.SET_REDIRECTION: {
      return {
        ...state,
        hasRedirected: action.payload.hasRedirected,
      };
    }
    default:
      throw new Error('Unexpected action: Auth Context');
  }
};

export default reducer;

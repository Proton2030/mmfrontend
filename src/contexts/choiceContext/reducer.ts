import { actions } from "./action";
import { ChoiceList, ChoiceListAction, Store } from "../../@types/contexts/choiceContext/choiceContext";

const reducer = (state: Store, action: ChoiceListAction): Store => {
    switch (action.type) {
        case actions.ADD_CHOICE_LIST: {
            const { choiceList } = action.payload as { choiceList: ChoiceList };
            return {
                ...state,
                choiceLists: [...state.choiceLists, choiceList],
            };
        }
        case actions.REMOVE_CHOICE_LIST: {
            const { choiceList } = action.payload as { choiceList: ChoiceList }; // Corrected
            return {
                ...state,
                choiceLists: state.choiceLists.filter((list) => list !== choiceList),
            };
        }
        default:
            throw new Error("Unexpected action in ChoiceListContext reducer.");
    }
};

export default reducer;

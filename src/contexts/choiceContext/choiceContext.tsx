import React, { createContext, useReducer, Dispatch, useState, useEffect } from "react";
import reducer from "./reducer";
import { initialState } from "./store";
import { ChoiceListAction, Store } from "../../@types/contexts/choiceContext/choiceContext";

type ChoiceContextType = {
    state: Store;
    dispatch: Dispatch<ChoiceListAction>;
};

const ChoiceContext = createContext<ChoiceContextType>({
    state: initialState,
    dispatch: () => null,
});

export const ChoiceContextProvider: React.FC = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [choiceListsSet, setChoiceListsSet] = useState<any>(new Set(state.choiceLists.map(choice => choice)));

    useEffect(() => {
        setChoiceListsSet(new Set(state.choiceLists.map(choice => choice)));
    }, [state.choiceLists]);

    return (
        <ChoiceContext.Provider value={{ state, dispatch }}>
            {children}
        </ChoiceContext.Provider>
    );
};

export default ChoiceContext;

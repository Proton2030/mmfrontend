export interface ChoiceList {
    listItem: Object;
}

export interface Store {
    choiceLists: ChoiceList[];
}

export type ChoiceListAction =
    | { type: "ADD_CHOICE_LIST"; payload: { choiceList: ChoiceList } }
    | { type: "REMOVE_CHOICE_LIST"; payload: { choiceList: ChoiceList } };

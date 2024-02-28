// messageSeenCountReducer.ts
import { MessageSeenCountAction } from "../../@types/contexts/messageSeenCountContext/messageSeenCountAction.types";
import { Store } from "../../@types/contexts/messageSeenCountContext/store.types";
import actions from "./action";

const reducer = (state: Store, action: MessageSeenCountAction) => {
    switch (action.type) {
        case actions.SET_MESSAGE_SEEN_COUNT: {
            return {
                ...state,
                messageSeenCount: action.payload.messageSeenCount
            };
        }
        default:
            throw new Error("Unexpected action: Message Seen Count Context");
    }
};

export default reducer;

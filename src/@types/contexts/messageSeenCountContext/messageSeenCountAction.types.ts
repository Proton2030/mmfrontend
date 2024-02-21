// ../../@types/contexts/messageSeenCountContext/messageSeenCountAction.types

export enum MessageSeenCountActionType {
    SET_MESSAGE_SEEN_COUNT = "SET_MESSAGE_SEEN_COUNT"
}

export interface SetMessageSeenCountAction {
    type: MessageSeenCountActionType.SET_MESSAGE_SEEN_COUNT;
    payload: {
        messageSeenCount: number;
    };
}

export type MessageSeenCountAction = SetMessageSeenCountAction;

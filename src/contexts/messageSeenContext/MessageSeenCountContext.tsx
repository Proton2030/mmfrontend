// useMessageSeenCount.ts
import { useContext } from 'react';
import { MessageSeenCountContext } from './MessageSeenCountContextProvider';

export const useMessageSeenCount = () => {
    const messageSeenCount = useContext(MessageSeenCountContext);

    return messageSeenCount;
};

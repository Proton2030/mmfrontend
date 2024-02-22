// MessageSeenCountContextProvider.tsx
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type MessageSeenCountContextType = {
    messageSeenCount: number;
    setMessageSeenCount: Dispatch<SetStateAction<number>>;
};

export const MessageSeenCountContext = createContext<MessageSeenCountContextType>({
    messageSeenCount: 0,
    setMessageSeenCount: () => { }, // Provide a dummy function here
});

const MessageSeenCountContextProvider = ({ children }: any) => {
    const [messageSeenCount, setMessageSeenCount] = useState<number>(0);

    return (
        <MessageSeenCountContext.Provider value={{ messageSeenCount, setMessageSeenCount }}>
            {children}
        </MessageSeenCountContext.Provider>
    );
};

export default MessageSeenCountContextProvider;

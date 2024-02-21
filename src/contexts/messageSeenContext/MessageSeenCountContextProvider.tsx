// MessageSeenCountContextProvider.tsx
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type MessageSeenCountContextType = {
    messageSeenCount: number | null;
    setMessageSeenCount: Dispatch<SetStateAction<number | null>>;
};

export const MessageSeenCountContext = createContext<MessageSeenCountContextType>({
    messageSeenCount: null,
    setMessageSeenCount: () => { }, // Provide a dummy function here
});

const MessageSeenCountContextProvider = ({ children }: any) => {
    const [messageSeenCount, setMessageSeenCount] = useState<number | null>(null);

    return (
        <MessageSeenCountContext.Provider value={{ messageSeenCount, setMessageSeenCount }}>
            {children}
        </MessageSeenCountContext.Provider>
    );
};

export default MessageSeenCountContextProvider;

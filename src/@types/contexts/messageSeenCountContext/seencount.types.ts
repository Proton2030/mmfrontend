import { Store } from "./store.types";


export type Action = {
    type: string;
    payload: Store;
};

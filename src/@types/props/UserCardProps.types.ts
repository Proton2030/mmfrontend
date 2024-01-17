import { IUserDetails } from "../types/userDEtails.types";

export interface IUserCardProps{
    userDetails:any,
    addChoice: (sender_id: string, reciver_id: string) => Promise<void>,
}
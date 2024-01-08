import { IUserDetails } from "../../types/userDEtails.types";

export type Store = {
	user: IUserDetails | null;
	isLoggedIn: boolean;
};

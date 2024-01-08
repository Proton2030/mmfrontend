import { IUserDetails } from "../../types/userDEtails.types";

export type AuthContextProps = {
	user: IUserDetails | null;
	setUser: (user: IUserDetails | null) => void;
};

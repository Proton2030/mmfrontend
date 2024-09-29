import { IUserDetails } from "../../types/userDetails.types";

export type AuthContextProps = {
	user: IUserDetails | null;
	setUser: (user: IUserDetails | null) => void;
};

import { IUserDetails } from '../../types/userDetails.types';

export type RedirectContextProps = {
  hasRedirected: boolean;
  setHasRedirected: (hasRedirected: boolean) => void;
};

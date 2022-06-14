import { User } from './user';

export interface Session {
  user: User | null;
  isValidToken: boolean;
  expiration: string | null;
}

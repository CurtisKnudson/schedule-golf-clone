// Types
import { NewUser, User } from 'types/user';
import { RefreshResponse } from 'apps/admin/adapters/types/authGrpcAdapter';
import { LoginCredentials } from 'apps/admin/types/loginCredentials';

export interface ForeUpAuthenticationRequest {
  email: string;
  password: string;
  scheduleGolfJwt: string;
}

export interface AuthMediatorInterface {
  createNewUser(newUser: NewUser): Promise<{ res: User; expiration: string }>;
  userLogin(
    userLoginCredentials: LoginCredentials,
  ): Promise<{ res: User; expiration: string }>;
  userTokenRefresh(): Promise<RefreshResponse>;
  foreUpAuthentication(authRequest: ForeUpAuthenticationRequest): Promise<
    | {
        isSucces: boolean;
        message: string;
      }
    | {
        isSuccess: boolean;
        message: string;
      }
  >;
}

// Types
import { NewUser, User } from 'types/user';
import { LoginCredentials } from 'pages/authentication/types/loginCredentials';
import { RefreshResponse } from 'adapters/types/authGrpcAdapter';

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
  userRefreshToken(): Promise<RefreshResponse>;
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

// Protos
import {
  CreateNewUserResponse,
  ForeUpAuthenticationRequest,
  UserLoginResponse,
} from 'gen/proto/ts/schedule_golf/authentication/v1alpha1/authentication';

// Types
import { NewUser } from 'types/user';
import { LoginCredentials } from 'pages/authentication/types/loginCredentials';

export interface RefreshResponse {
  isAuthenticated: boolean;
  expiration: null | string;
}

export interface AuthGrpcAdapter {
  createNewUser(
    newUser: NewUser,
  ): Promise<{ res: CreateNewUserResponse; expiration: string }>;
  userLogin(
    userLoginCredentials: LoginCredentials,
  ): Promise<{ res: UserLoginResponse; expiration: string }>;
  userTokenRefresh(): Promise<RefreshResponse>;
  foreUpAuthentication({
    email,
    password,
    scheduleGolfJwt,
  }: ForeUpAuthenticationRequest): Promise<
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

// Protos
import {
  CreateNewUserResponse,
  UserLoginResponse,
} from 'gen/proto/ts/schedule_golf/authentication/v1alpha1/authentication';

// Types
import { NewUser } from 'types/user';
import { LoginCredentials } from 'pages/authentication/types/loginCredentials';
import { AuthError } from 'mediators/types/error';

export interface AuthMediatorInterface {
  createNewUser(newUser: NewUser): Promise<CreateNewUserResponse>;
  userLogin(userLoginCredentials: LoginCredentials): Promise<UserLoginResponse>;
}

// Adapter
import { AuthGrpcAdapter as AuthGrpcAdapterInterface } from 'adapters/types/authGrpcAdapter';
// Protos
import {
  CreateNewUserRequest,
  UserLoginRequest,
  UserLoginResponse,
} from 'gen/proto/ts/schedule_golf/authentication/v1alpha1/authentication';

// Types
import { NewUser } from 'types/user';
import { LoginCredentials } from 'pages/authentication/types/loginCredentials';

export class AuthGrpcAdapterMock implements AuthGrpcAdapterInterface {
  async createNewUser(newUser: NewUser) {
    const req: CreateNewUserRequest = {
      ...newUser,
    };

    return Promise.resolve(req);
  }

  async userLogin(userLoginCredentials: LoginCredentials) {
    if (!userLoginCredentials) {
      throw new Error('You must provide user login credentials');
    }
    const req: UserLoginRequest = {
      ...userLoginCredentials,
    };

    const res: UserLoginResponse = {
      userId: '123456789',
      companyName: 'Riverbend Golf Community',
      firstName: 'Curtis',
      lastName: 'Knudson',
      email: req.email,
    };
    return Promise.resolve(res);
  }

  async userTokenRefresh() {
    return Promise.resolve({
      isAuthenticated: true,
    });
  }
}

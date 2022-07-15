// Adapter
import { AuthGrpcAdapter as AuthGrpcAdapterInterface } from 'apps/admin/adapters/types/authGrpcAdapter';
// Protos
import {
  CreateNewUserRequest,
  ForeUpAuthenticationRequest,
  UserLoginRequest,
  UserLoginResponse,
} from 'gen/proto/ts/schedule_golf/authentication/v1alpha1/authentication';

// Types
import { NewUser } from 'types/user';
import { LoginCredentials } from 'apps/admin/types/loginCredentials';

export class AuthGrpcAdapterMock implements AuthGrpcAdapterInterface {
  async createNewUser(newUser: NewUser) {
    const req: CreateNewUserRequest = {
      ...newUser,
    };

    return Promise.resolve({
      res: req,
      expiration: new Date().toString(),
    });
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
    return Promise.resolve({
      res,
      expiration: new Date().toString(),
    });
  }

  async userTokenRefresh() {
    return Promise.resolve({
      isAuthenticated: true,
      expiration: new Date().toString(),
    });
  }

  async foreUpAuthentication({
    email,
    password,
    scheduleGolfJwt,
  }: ForeUpAuthenticationRequest) {
    const req = {
      email,
      password,
      scheduleGolfJwt,
    };
    return {
      isSuccess: true,
      message: req.email,
    };
  }
}

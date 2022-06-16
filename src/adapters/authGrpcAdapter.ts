// Node Modules
import Cookies from 'js-cookie';
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
// Types
import { LoginCredentials } from 'pages/authentication/types/loginCredentials';
import { NewUser } from 'types/user';
import { AuthGrpcAdapter as AuthGrpcAdapterInterface } from 'adapters/types/authGrpcAdapter';
// Constants
import { apiUrl } from 'constants/apiUrl';
// Protos
import {
  CreateNewUserRequest,
  UserLoginRequest,
} from 'gen/proto/ts/schedule_golf/authentication/v1alpha1/authentication';
import { AuthenticatorServiceClient } from 'gen/proto/ts/schedule_golf/authentication/v1alpha1/authentication.client';
import { setCookie } from 'utils/setCookie';

export class AuthGrpcAdapter implements AuthGrpcAdapterInterface {
  transport = new GrpcWebFetchTransport({
    baseUrl: apiUrl,
  });
  authenticator = new AuthenticatorServiceClient(this.transport);

  async createNewUser(newUser: NewUser) {
    const req: CreateNewUserRequest = {
      ...newUser,
    };

    const res = await this.authenticator.createNewUser(req);

    if (typeof res.headers.token !== 'string') {
      throw new Error('Request Headers returned an invalid token');
    }

    Cookies.remove('token');
    Cookies.set('token', res.headers.token);

    return res.response;
  }

  async userLogin(userLoginCredentials: LoginCredentials) {
    const req: UserLoginRequest = {
      ...userLoginCredentials,
    };

    const res = await this.authenticator.userLogin(req);

    if (typeof res.headers.token !== 'string') {
      throw new Error('Request Headers returned an invalid token');
    }

    setCookie('token', res.headers.token);

    return res.response;
  }
}

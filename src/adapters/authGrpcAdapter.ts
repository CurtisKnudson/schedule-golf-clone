// Node Modules
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
// Types
import { LoginCredentials } from 'pages/authentication/types/loginCredentials';
import { NewUser } from 'types/user';
import {
  AuthGrpcAdapter as AuthGrpcAdapterInterface,
  RefreshResponse,
} from 'adapters/types/authGrpcAdapter';
import { GrpcCode } from 'types/code';
// Constants
import { apiUrl } from 'constants/apiUrl';
// Protos
import {
  CreateNewUserRequest,
  ForeUpAuthenticationRequest,
  UserLoginRequest,
  UserTokenRefreshRequest,
} from 'gen/proto/ts/schedule_golf/authentication/v1alpha1/authentication';
import { AuthenticatorServiceClient } from 'gen/proto/ts/schedule_golf/authentication/v1alpha1/authentication.client';
// Utils
import { getCookie, setCookie } from 'utils/cookieHelper';

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

    if (
      typeof res.headers.token !== 'string' ||
      typeof res.headers.expiration !== 'string'
    ) {
      throw new Error('Request Headers returned an invalid token or expiration');
    }

    // Need to set a cookie that expires based on the return value in the metadata
    setCookie('token', res.headers.token, res.headers.expiration);

    return {
      res: res.response,
      expiration: res.headers.expiration,
    };
  }

  async userLogin(userLoginCredentials: LoginCredentials) {
    const req: UserLoginRequest = {
      ...userLoginCredentials,
    };

    const res = await this.authenticator.userLogin(req);

    if (
      typeof res.headers.token !== 'string' ||
      typeof res.headers.expiration !== 'string'
    ) {
      throw new Error('Request Headers returned an invalid token or expiration');
    }

    setCookie('token', res.headers.token, res.headers.expiration);

    return {
      res: res.response,
      expiration: res.headers.expiration,
    };
  }

  async userTokenRefresh() {
    const jwt = getCookie('token');

    if (!jwt) {
      throw new Error('userTokenRefresh did not receive a webtoken');
    }

    const req: UserTokenRefreshRequest = {
      jwt,
    };

    const res = await this.authenticator.userTokenRefresh(req);

    const { status } = res.response;

    const refreshResponse: RefreshResponse = {
      isAuthenticated: false,
      expiration: null,
    };

    // If JWT is succesfully refreshed, update the cookie
    if (status?.code === GrpcCode.OK) {
      setCookie('token', res.response.jwt, res.response.expiration);
      refreshResponse.isAuthenticated = true;
      refreshResponse.expiration = res.response.expiration;
      return refreshResponse;
    }
    // If the JWT is cancelled by the API, leave everything as it is. This means that the JWT is still valid
    if (status?.code === GrpcCode.CANCELLED) {
      refreshResponse.isAuthenticated = true;
      return refreshResponse;
    }

    return refreshResponse;
  }

  async foreUpAuthentication({
    email,
    password,
    scheduleGolfJwt,
  }: ForeUpAuthenticationRequest) {
    const req: ForeUpAuthenticationRequest = {
      email,
      password,
      scheduleGolfJwt,
    };

    const res = await this.authenticator.foreUpAuthentication(req);

    console.log(res);
  }
}

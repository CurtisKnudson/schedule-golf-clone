// Node Modules
import { v4 } from 'uuid';
// Types
import {
  AuthMediatorInterface,
  ForeUpAuthenticationRequest,
} from 'apps/admin/mediators/types/authMediatorInterface';
import { LoginCredentials } from 'apps/admin/types/loginCredentials';
import { NewUser } from 'types/user';
// Adapter
import { AuthGrpcAdapter } from 'apps/admin/adapters/types/authGrpcAdapter';

export class AuthMediator implements AuthMediatorInterface {
  private adapter: AuthGrpcAdapter;

  constructor(adapter: AuthGrpcAdapter) {
    this.adapter = adapter;
  }

  async createNewUser(newUser: NewUser) {
    if (!newUser) {
      throw new Error('You must provide newUser credentials');
    }
    newUser.userId = v4();
    const req = await this.adapter.createNewUser(newUser);

    // TODO: Need Error Handling
    // What if the user authentication fails?
    return req;
  }

  async userLogin(userLoginCredentials: LoginCredentials) {
    if (!userLoginCredentials) {
      throw new Error('You must provide login credentials to login');
    }
    if (!userLoginCredentials.email) {
      throw new Error('You must provide an email to login');
    }
    if (!userLoginCredentials.password) {
      throw new Error('You must provide a password to login');
    }

    const req = await this.adapter.userLogin(userLoginCredentials);

    return req;
  }
  async userTokenRefresh() {
    return await this.adapter.userTokenRefresh();
  }
  async foreUpAuthentication(authRequest: ForeUpAuthenticationRequest) {
    return await this.adapter.foreUpAuthentication(authRequest);
  }
  dispose() {
    return;
  }
}

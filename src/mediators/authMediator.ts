// Node Modules
import { AuthGrpcAdapter } from 'adapters/types/authGrpcAdapter';
// Types
import { AuthMediatorInterface } from 'mediators/types/authMediatorInterface';
import { NewUser } from 'types/user';
import { v4 } from 'uuid';

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

  dispose() {
    return;
  }
}

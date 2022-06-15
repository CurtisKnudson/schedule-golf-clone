// Adapter
import { AuthGrpcAdapter as AuthGrpcAdapterInterface } from 'adapters/types/authGrpcAdapter';
// Protos
import { CreateNewUserRequest } from 'gen/proto/ts/schedule_golf/authentication/v1alpha1/authentication';
// Types
import { NewUser } from 'types/user';

export class AuthGrpcAdapterMock implements AuthGrpcAdapterInterface {
  async createNewUser(newUser: NewUser) {
    const req: CreateNewUserRequest = {
      ...newUser,
    };

    return Promise.resolve(req);
  }
}

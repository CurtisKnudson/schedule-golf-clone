// Types
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { AuthGrpcAdapter as AuthGrpcAdapterInterface } from 'adapters/types/authGrpcAdapter';
// Constants
import { apiUrl } from 'constants/apiUrl';
// Protos
import { CreateNewUserRequest } from 'gen/proto/ts/schedule_golf/authentication/v1alpha1/authentication';
import { AuthenticatorServiceClient } from 'gen/proto/ts/schedule_golf/authentication/v1alpha1/authentication.client';
import { NewUser } from 'types/user';

export class AuthGrpcAdapter implements AuthGrpcAdapterInterface {
  transport = new GrpcWebFetchTransport({
    baseUrl: apiUrl,
  });
  authenticator = new AuthenticatorServiceClient(this.transport);

  async createNewUser(newUser: NewUser) {
    const req: CreateNewUserRequest = {
      ...newUser,
    };

    return await this.authenticator.createNewUser(req);
  }
}

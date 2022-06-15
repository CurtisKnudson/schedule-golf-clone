// Protos
import { CreateNewUserResponse } from 'gen/proto/ts/schedule_golf/authentication/v1alpha1/authentication';
// Types
import { NewUser } from 'types/user';

export interface AuthMediatorInterface {
  createNewUser(newUser: NewUser): Promise<CreateNewUserResponse>;
}

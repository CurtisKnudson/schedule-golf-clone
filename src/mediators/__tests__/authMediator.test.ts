// Node Modules
import { describe, it, expect } from 'vitest';
// Mocks
import { AuthGrpcAdapterMock } from 'adapters/__mocks__/authGrpcAdapter';
// Mediators
import { AuthMediator } from 'mediators/authMediator';

describe('Auth Mediator', () => {
  const adapter = new AuthGrpcAdapterMock();
  const authMediator = new AuthMediator(adapter);

  it('Create New User', async () => {
    const req = await authMediator.createNewUser({
      userId: '1234567890',
      companyName: 'Riverbend Golf Community',
      firstName: 'Curtis',
      lastName: 'Knudson',
      email: 'curtis@gmail.com',
      password: 'testpassword',
    });
    expect(req).toMatchObject({
      companyName: 'Riverbend Golf Community',
      firstName: 'Curtis',
      lastName: 'Knudson',
      email: 'curtis@gmail.com',
      password: 'testpassword',
    });
  });
});

// Node Modules
// Mocks
import { AuthGrpcAdapterMock } from 'apps/admin/adapters/__mocks__/authGrpcAdapter';
// Mediators
import { AuthMediator } from 'apps/admin/mediators/authMediator';
import { describe, expect, it } from 'vitest';

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
    expect(req.res).toMatchObject({
      companyName: 'Riverbend Golf Community',
      firstName: 'Curtis',
      lastName: 'Knudson',
      email: 'curtis@gmail.com',
      password: 'testpassword',
    });
    expect(req.res).toMatchSnapshot({
      userId: expect.any(String),
    });
    expect(req.expiration).toBeTruthy();
  });

  it('UserLogin', async () => {
    const { res, expiration } = await authMediator.userLogin({
      email: 'curtis@gmail.com',
      password: 'thisisapassword',
    });

    expect(res).toBeTruthy();
    expect(res).toMatchSnapshot();

    expect(expiration).toBeTruthy();
  });

  it('UserTokenRefresh', async () => {
    const req = await authMediator.userTokenRefresh();

    const { isAuthenticated, expiration } = req;

    expect(isAuthenticated).toBeTruthy();
    expect(expiration).toBeTruthy();
  });
});

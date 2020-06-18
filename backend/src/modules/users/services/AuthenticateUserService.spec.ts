import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Raul Garcia',
      email: 'raul.gsouza@gmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'raul.gsouza@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not authenticate user with wrong email or password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'raul.gsouza@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await createUser.execute({
      name: 'Raul Garcia',
      email: 'raul.gsouza@gmail.com',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'raul.gsouza@gmail.com',
        password: '111111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

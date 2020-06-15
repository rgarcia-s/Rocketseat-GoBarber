import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersReposiroty = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersReposiroty);

    const user = await createUser.execute({
      name: 'Raul Garcia',
      email: 'raul.gsouza@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create more than one user with the same email', async () => {
    const fakeUsersReposiroty = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersReposiroty);

    await createUser.execute({
      name: 'Raul Garcia',
      email: 'raul.gsouza@gmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Raul Garcia',
        email: 'raul.gsouza@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

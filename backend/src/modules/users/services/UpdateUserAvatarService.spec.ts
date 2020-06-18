import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to set a new user avatar', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Raul Garcia',
      email: 'raul.gsouza@gmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar',
    });

    expect(user.avatar).toEqual('avatar');
  });

  it('should be able to update user avatar', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Raul Garcia',
      email: 'raul.gsouza@gmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'replaced_avatar',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar');
    expect(user.avatar).toEqual('replaced_avatar');
  });

  it('should be able to set a new user avatar', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatar.execute({
        user_id: '1',
        avatarFilename: 'avatar',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to set a new user avatar', async () => {
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
    await expect(
      updateUserAvatar.execute({
        user_id: '1',
        avatarFilename: 'avatar',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Raul',
      email: 'raul.gsouza@gmail.com.br',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Raul Garcia',
      email: 'raul.gsouza@gmail.com',
    });

    expect(updatedUser.name).toBe('Raul Garcia');
    expect(updatedUser.email).toBe('raul.gsouza@gmail.com');
  });

  it('should not be able to update to a email that is already used', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Raul',
      email: 'raul.gsouza@gmail.com.br',
      password: '123456',
    });

    await fakeUsersRepository.create({
      name: 'Raul G Souza',
      email: 'raul.gsouza@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Raul Garcia',
        email: 'raul.gsouza@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Raul',
      email: 'raul.gsouza@gmail.com.br',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Raul Garcia',
      email: 'raul.gsouza@gmail.com',
      old_password: '123456',
      password: '1234567',
    });

    expect(updatedUser.password).toBe('1234567');
  });

  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Raul',
      email: 'raul.gsouza@gmail.com.br',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Raul Garcia',
        email: 'raul.gsouza@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Raul',
      email: 'raul.gsouza@gmail.com.br',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Raul Garcia',
        email: 'raul.gsouza@gmail.com',
        old_password: '123123',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
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

  test("should be able to update user's profile", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'my-password',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Other Doe',
      email: 'john.other.doe@example.com',
    });

    expect(updatedUser.name).toBe('John Other Doe');
    expect(updatedUser.email).toBe('john.other.doe@example.com');
  });

  test('should not be able to update the profile of a non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: '752cbf58-a850-4a36-9f20-bda28fd7e3df',
        name: 'Test',
        email: 'test@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  test('should not be able to change to another registered e-mail', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'my-password',
    });

    const user = await fakeUsersRepository.create({
      name: 'New User',
      email: 'new.user@example.com',
      password: 'my-password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'New User',
        email: 'john.doe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  test('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'my-password',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'john.doe@example.com',
      old_password: 'my-password',
      password: 'my-new-password',
    });

    expect(updatedUser.password).toBe('my-new-password');
  });

  test('should be not able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'my-password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'john.doe@example.com',
        old_password: 'wrong-password',
        password: 'my-new-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

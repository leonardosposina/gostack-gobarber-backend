import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  test('should be able to authenticate a user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Leonardo Sposina',
      email: 'john.doe@example.com',
      password: 'my-password',
    });

    const response = await authenticateUser.execute({
      email: 'john.doe@example.com',
      password: 'my-password',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  test('should not be able to authenticate with invalid e-mail', async () => {
    await expect(
      authenticateUser.execute({
        email: 'john.doe@example.com',
        password: 'my-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  test('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'my-password',
    });

    await expect(
      authenticateUser.execute({
        email: 'john.doe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

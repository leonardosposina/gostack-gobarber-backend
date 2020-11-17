import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  test("should be able to show user's profile", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'my-password',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('john.doe@example.com');
  });

  test('should not be able to show the profile of a non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: '752cbf58-a850-4a36-9f20-bda28fd7e3df',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

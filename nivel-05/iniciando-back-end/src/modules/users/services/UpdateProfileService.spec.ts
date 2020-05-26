import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
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
      name: 'teste',
      email: 'teste@teste.com.br',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
    });

    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('johntre@example.com');
  });
  it('should not be able to update the profile from non existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'test',
        email: 'test@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'teste',
      email: 'johntre@example.com',
      password: '123123',
    });
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com.br',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com.br',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
      old_password: '123123',
      password: '123321',
    });

    expect(updatedUser.password).toBe('123321');
  });
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com.br',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@example.com',
        password: '123321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com.br',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@example.com',
        old_password: 'wrong-old-password',
        password: '123321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

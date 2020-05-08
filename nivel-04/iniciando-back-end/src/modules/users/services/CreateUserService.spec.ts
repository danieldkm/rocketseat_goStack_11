import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('shourd be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'teste',
      email: 'teste@teste.com.br',
      password: '123123',
    });
    expect(user).toHaveProperty('id');
  });
  it('shourd not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'teste',
      email: 'teste@teste.com.br',
      password: '123123',
    });
    expect(
      createUser.execute({
        name: 'teste',
        email: 'teste@teste.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}
@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('StorageProvider') private storageProider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      this.storageProider.deleteFile(user.avatar);
    }

    const filename = await this.storageProider.saveFile(avatarFilename);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

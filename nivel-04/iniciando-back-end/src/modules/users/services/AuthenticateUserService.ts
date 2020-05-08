import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import auth from '@config/auth';
import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: User;
  token: string;
}
export default class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    const { jwt } = auth;

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, jwt.secret, {
      subject: user.id,
      expiresIn: jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

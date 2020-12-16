// import { getCustomRepository } from "typeorm";
import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import { sign } from 'jsonwebtoken';


interface Request {
  email: string,
  password: string,
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class CreateUserSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid email or password.', 401);
    }

    const checkPasswordMatched = await this.hashProvider.compareHash(password, user.password);

    if (!checkPasswordMatched) {
      throw new AppError('Invalid email or password.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    
    const token = sign({}, secret, {
      subject: user.id.toString(),
      expiresIn,
    });
    
    return { user, token };
  }
}

export default CreateUserSessionService;
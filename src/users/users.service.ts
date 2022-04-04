import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { UserResponseInterface } from "./types/userResponse.interface";
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  generateJwt(user: UsersEntity): string {
    return sign(
      { id: user.id, username: user.email, user: user.username },
      JWT_SECRET,
    );
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new UsersEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }
  buildUserResponse(user: UsersEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}

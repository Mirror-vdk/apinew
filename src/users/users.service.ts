import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { compare } from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';
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
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    const userByUsername = await this.userRepository.findOne({
      username: createUserDto.username,
    });
    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Пользователь с таким именем или почтовым адресом существует',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
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
  async loginUser(loginUserDto: LoginUserDto): Promise<UsersEntity> {
    const user = await this.userRepository.findOne(
      {
        email: loginUserDto.email,
      },
      { select: ['id', 'username', 'email', 'bio', 'image', 'password'] },
    );

    if (!user) {
      throw new HttpException(
        'Данные не верны',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new HttpException(
        'Неверный логин или пароль',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    delete user.password;
    return user;
  }
  async updateUser(userId: number,updateUserDto: UpdateUserDto,): Promise<UsersEntity> {
    const user = await this.findById(userId);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }
  findById(id: number): Promise<UsersEntity> {
    return this.userRepository.findOne(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './interface/user.interface';

import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const saltRoundCrypt = 10;

    const newHash = await hash(createUserDto.password, saltRoundCrypt);

    const user = {
      ...createUserDto,
      id: this.users.length + 1,
      password: newHash,
    };

    this.users.push(user);

    return user;
  }

  async getAllUser(): Promise<User[]> {
    return this.users;
  }
}

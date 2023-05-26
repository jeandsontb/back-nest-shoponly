import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entity/user.entity';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginDto: LoginDto): Promise<UserEntity> {
    const user: UserEntity = await this.userService
      .getUserByEmail(loginDto.email)
      .catch(() => undefined);

    if (!user) {
      throw new NotFoundException('E-mail inválido!');
    }

    const IsPasswordMatch = await compare(loginDto.password, user.password);

    if (!IsPasswordMatch) {
      throw new NotFoundException('Senha inválida!');
    }

    return user;
  }
}

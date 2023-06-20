import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entity/user.entity';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReadLoginDto } from './dto/readLogin.dto';
import { ReadUserDto } from '../user/dto/readUser.dto';
import { LoginPayloadDto } from './dto/loginPayload.dto';
import { validatePassword } from 'src/utils/password';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReadLoginDto> {
    const user: UserEntity = await this.userService
      .getUserByEmail(loginDto.email)
      .catch(() => undefined);

    if (!user) {
      throw new NotFoundException('E-mail inválido!');
    }

    const IsPasswordMatch = await validatePassword(
      loginDto.password,
      user.password,
    );

    if (!IsPasswordMatch) {
      throw new NotFoundException('Senha inválida!');
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayloadDto(user) }),
      user: new ReadUserDto(user),
    };
  }
}

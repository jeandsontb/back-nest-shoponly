import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entity/user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypeRole } from './enum/user-type.enum';
import { UpdatePasswordDto } from './dto/updateUser.dto';
import { createPasswordHashed, validatePassword } from '../utils/password';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // CRIAÇÃO DE UM USUÁRIO *****************************************************
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.getUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadGatewayException('E-mail já registrado no sistema.');
    }

    const newHash = await createPasswordHashed(createUserDto.password);

    return this.userRepository.save({
      ...createUserDto,
      typeUser: UserTypeRole.User,
      password: newHash,
    });
  }

  //  PEGA UM USUÁRIO COM A REFERÊNCIA TAMBÉM DE UM ENDEREÇO *******************
  async getUserByIdWithReferenceAddress(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
  }

  //  PEGA TODOS OS USUÁRIOS ***************************************************
  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  //  VERIFICA SE EXISTE UM USUÁRIO COM O ID INFORMADO *************************
  async getUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  //  VERIFICA SE EXISTE UM USUÁRIO COM O EMAIL INFORMADO **********************
  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async updatePasswordUser(
    userId: number,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.getUserById(userId);

    const newHash = await createPasswordHashed(updatePasswordDto.newPassword);

    const isMatch = await validatePassword(
      updatePasswordDto.lastPassword,
      user.password || '',
    );

    if (!isMatch) {
      throw new BadRequestException('Senha atual inválida');
    }

    return this.userRepository.save({
      ...user,
      password: newHash,
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entity/user.entity';

import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // CRIAÇÃO DE UM USUÁRIO *****************************************************
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const saltRoundCrypt = 10;
    const newHash = await hash(createUserDto.password, saltRoundCrypt);

    return this.userRepository.save({
      ...createUserDto,
      typeUser: 1,
      password: newHash,
    });
  }

  //  PEGA UM USUÁRIO COM A REFERÊNCIA TAMBÉM DE UM ENDEREÇO *******************
  async getUserByIdWithReferenceAddress(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['addresses'],
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
}

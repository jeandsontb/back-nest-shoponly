import { UserEntity } from '../entity/user.entity';

export class ReadUserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;
  }
}

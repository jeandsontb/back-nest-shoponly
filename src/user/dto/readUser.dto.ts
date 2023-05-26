import { ReadAddressDto } from 'src/address/dto/ReadAddress.dto';
import { UserEntity } from '../entity/user.entity';

export class ReadUserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  addresses?: ReadAddressDto[];

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;
    this.addresses = userEntity.addresses
      ? userEntity.addresses.map((address) => new ReadAddressDto(address))
      : undefined;
  }
}

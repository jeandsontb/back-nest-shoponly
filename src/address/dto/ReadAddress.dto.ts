import { ReadCityDto } from '../../city/dto/readCity.dto';
import { AddressEntity } from '../entity/address.entity';

export class ReadAddressDto {
  id: number;
  complement: string;
  numberAddress: number;
  cep: string;
  city?: ReadCityDto;

  constructor(address: AddressEntity) {
    this.id = address.id;
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
    this.city = address.city ? new ReadCityDto(address.city) : undefined;
  }
}

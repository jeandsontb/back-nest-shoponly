import { ReadCepExternalDto } from './read-cep-external.dto';

export class readCepDto {
  cep: string;
  publicPlace: string;
  complement: string;
  neighborhood: string;
  city: string;
  uf: string;
  state: string;
  ddd: string;

  cityId?: number;
  stateId?: number;

  constructor(
    returnCep: ReadCepExternalDto,
    cityId?: number,
    stateId?: number,
  ) {
    this.cep = returnCep.cep;
    this.publicPlace = returnCep.logradouro;
    this.complement = returnCep.complemento;
    this.neighborhood = returnCep.bairro;
    this.city = returnCep.localidade;
    this.uf = returnCep.uf;
    this.ddd = returnCep.ddd;

    this.cityId = cityId;
    this.stateId = stateId;
  }
}

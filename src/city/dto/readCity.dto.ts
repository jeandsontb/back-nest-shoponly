import { ReadStateDto } from '../../state/dto/readState.dto';
import { CityEntity } from '../entity/city.entity';

export class ReadCityDto {
  name: string;
  state?: ReadStateDto;

  constructor(city: CityEntity) {
    this.name = city.name;
    this.state = city.state ? new ReadStateDto(city.state) : undefined;
  }
}

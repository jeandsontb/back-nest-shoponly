import { StateEntity } from '../entity/state.entity';

export class ReadStateDto {
  name: string;

  constructor(state: StateEntity) {
    this.name = state.name;
  }
}

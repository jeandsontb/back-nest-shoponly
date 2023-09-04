import { ReadUserDto } from 'src/user/dto/readUser.dto';
import { OrderEntity } from '../entity/order.entity';

export class ReadOrderDto {
  id: number;
  date: string;
  user?: ReadUserDto;

  constructor(order: OrderEntity) {
    this.id = order.id;
    this.date = order.date.toString();
    this.user = order.user ? new ReadUserDto(order.user) : undefined;
  }
}

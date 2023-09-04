import { ReadPaymentDto } from '../../payment/dto/read-payment.dto';
import { ReadAddressDto } from '../../address/dto/ReadAddress.dto';
import { ReadUserDto } from '../../user/dto/readUser.dto';
import { OrderEntity } from '../entity/order.entity';
import { OrderProductEntity } from '../../order-product/entity/order-product.entity';

export class ReadOrderDto {
  id: number;
  date: string;
  user?: ReadUserDto;
  address?: ReadAddressDto;
  payment?: ReadPaymentDto;
  ordersProduct?: OrderProductEntity[];

  constructor(order: OrderEntity) {
    this.id = order.id;
    this.date = order.date.toString();
    this.user = order.user ? new ReadUserDto(order.user) : undefined;
    this.address = order.address
      ? new ReadAddressDto(order.address)
      : undefined;
    this.payment = order.payment
      ? new ReadPaymentDto(order.payment)
      : undefined;
    this.ordersProduct = order.ordersProduct;
  }
}

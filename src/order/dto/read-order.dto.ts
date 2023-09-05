import { ReadPaymentDto } from '../../payment/dto/read-payment.dto';
import { ReadAddressDto } from '../../address/dto/ReadAddress.dto';
import { ReadUserDto } from '../../user/dto/readUser.dto';
import { OrderEntity } from '../entity/order.entity';
import { ReadOrderProductDto } from '../../order-product/dto/read-order-product.dto';

export class ReadOrderDto {
  id: number;
  date: string;
  userId: number;
  addressId: number;
  paymentId: number;
  user?: ReadUserDto;
  address?: ReadAddressDto;
  payment?: ReadPaymentDto;
  ordersProduct?: ReadOrderProductDto[];
  amountProducts?: number;

  constructor(order: OrderEntity) {
    this.id = order.id;
    this.date = order.date.toString();
    this.userId = order.userId;
    this.addressId = order.addressId;
    this.paymentId = order.paymentId;
    this.user = order.user ? new ReadUserDto(order.user) : undefined;
    this.address = order.address
      ? new ReadAddressDto(order.address)
      : undefined;
    this.payment = order.payment
      ? new ReadPaymentDto(order.payment)
      : undefined;
    this.ordersProduct = order.ordersProduct
      ? order.ordersProduct.map((orders) => new ReadOrderProductDto(orders))
      : undefined;
    this.amountProducts = order.amountProducts;
  }
}

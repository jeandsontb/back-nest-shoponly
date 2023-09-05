import { ReadOrderDto } from '../../order/dto/read-order.dto';
import { ReadProductDto } from '../../product/dto/read-product.dto';
import { OrderProductEntity } from '../entity/order-product.entity';

export class ReadOrderProductDto {
  id: number;
  orderId: number;
  productId: number;
  amount: number;
  price: number;
  order?: ReadOrderDto;
  product?: ReadProductDto;

  constructor(orderProduct: OrderProductEntity) {
    this.id = orderProduct.id;
    this.orderId = orderProduct.orderId;
    this.productId = orderProduct.productId;
    this.amount = orderProduct.amount;
    this.price = orderProduct.price;
    this.order = orderProduct.order
      ? new ReadOrderDto(orderProduct.order)
      : undefined;
    this.product = orderProduct.product
      ? new ReadProductDto(orderProduct.product)
      : undefined;
  }
}

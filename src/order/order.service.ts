import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entity/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaymentService } from 'src/payment/payment.service';
import { CartService } from 'src/cart/cart.service';
import { OrderProductService } from 'src/order-product/order-product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly paymentService: PaymentService,
    private readonly cartService: CartService,
    private readonly orderProductService: OrderProductService,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    cartId: number,
    userId: number,
  ) {
    const payment = await this.paymentService.createPayment(createOrderDto);

    const order = await this.orderRepository.save({
      addressId: createOrderDto.addressId,
      date: new Date(),
      paymentId: payment.id,
      userId,
    });

    const cart = await this.cartService.getCartUserById(userId, true);

    cart.cartProduct?.forEach((cartProduct) => {
      this.orderProductService.createOrderProduct(
        cartProduct.productId,
        order.id,
        0,
        cartProduct.amount,
      );
    });

    return null;
  }
}

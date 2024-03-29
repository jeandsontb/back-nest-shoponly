import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entity/payment.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../order/dto/create-order.dto';
import { PaymentCardEntity } from './entity/payment-card.entity';
import { PaymentType } from '../payment-status/enum/payment-type.enum';
import { PaymentPixEntity } from './entity/payment-pix.entity';
import { ProductEntity } from '../product/entity/product.entity';
import { CartEntity } from '../cart/entity/cart.entity';
import { CartProductEntity } from '../cart-product/entity/cart-product.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  generateFinalPrice(cart: CartEntity, products: ProductEntity[]): number {
    if (!cart.cartProduct || cart.cartProduct.length === 0) {
      return 0;
    }

    return Number(
      cart.cartProduct
        .map((cartProduct: CartProductEntity) => {
          const product = products.find(
            (product) => product.id === cartProduct.productId,
          );

          if (product) {
            return cartProduct.amount * product.price;
          }

          return 0;
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        .toFixed(2),
    );
  }

  async createPayment(
    createOrderDto: CreateOrderDto,
    products: ProductEntity[],
    cart: CartEntity,
  ): Promise<PaymentEntity> {
    const finalPrice = this.generateFinalPrice(cart, products);

    if (createOrderDto.amountPayments) {
      const paymentCreditCart = new PaymentCardEntity(
        PaymentType.Done,
        finalPrice,
        0,
        finalPrice,
        createOrderDto,
      );
      return this.paymentRepository.save(paymentCreditCart);
    } else if (createOrderDto.codePix && createOrderDto.datePayment) {
      const paymentPix = new PaymentPixEntity(
        PaymentType.Done,
        finalPrice,
        0,
        finalPrice,
        createOrderDto,
      );
      return this.paymentRepository.save(paymentPix);
    }

    throw new BadRequestException(
      'Valor do pagamento ou código do PIX não encontrado.',
    );
  }
}

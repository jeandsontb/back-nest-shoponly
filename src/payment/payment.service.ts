import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entity/payment.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { PaymentCardEntity } from './entity/payment-card.entity';
import { PaymentType } from 'src/payment-status/enum/payment-type.enum';
import { PaymentPixEntity } from './entity/payment-pix.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async createPayment(createOrderDto: CreateOrderDto): Promise<PaymentEntity> {
    if (createOrderDto.amountPayments) {
      const paymentCreditCart = new PaymentCardEntity(
        PaymentType.Done,
        0,
        0,
        0,
        createOrderDto,
      );
      return this.paymentRepository.save(paymentCreditCart);
    } else if (createOrderDto.codePix && createOrderDto.datePayment) {
      const paymentPix = new PaymentPixEntity(
        PaymentType.Done,
        0,
        0,
        0,
        createOrderDto,
      );
      return this.paymentRepository.save(paymentPix);
    }

    throw new BadRequestException(
      'Valor do pagamento ou código do PIX não encontrado.',
    );
  }
}

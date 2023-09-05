import { ReadPaymentStatusDto } from '../../payment-status/dto/read-payment-status.dto';
import { PaymentEntity } from '../entity/payment.entity';

export class ReadPaymentDto {
  id: number;
  statusIs: number;
  price: number;
  discount: number;
  finalPrice: number;
  type: string;
  paymentStatus?: ReadPaymentStatusDto;

  constructor(payment: PaymentEntity) {
    this.id = payment.id;
    this.statusIs = payment.statusId;
    this.price = payment.price;
    this.discount = payment.discount;
    this.finalPrice = payment.finalPrice;
    this.type = payment.type;
    this.paymentStatus = payment.paymentStatus
      ? new ReadPaymentStatusDto(payment.paymentStatus)
      : undefined;
  }
}

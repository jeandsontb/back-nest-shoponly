import { PaymentStatusEntity } from '../entity/payment-status.entity';

export class ReadPaymentStatusDto {
  id: number;
  name: string;

  constructor(paymentStatus: PaymentStatusEntity) {
    this.id = paymentStatus.id;
    this.name = paymentStatus.name;
  }
}

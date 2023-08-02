import { PaymentType } from 'src/payment-status/enum/payment-type.enum';
import { PaymentEntity } from '../entity/payment.entity';

export const paymentMock: PaymentEntity = {
  createdAt: new Date(),
  discount: 456,
  finalPrice: 6546545,
  id: 524,
  price: 55526,
  statusId: PaymentType.Done,
  updatedAt: new Date(),
  type: '',
};

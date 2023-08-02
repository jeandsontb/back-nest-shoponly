import { PaymentPixEntity } from '../entity/payment-pix.entity';
import { paymentMock } from './payment.mock';

export const paymentPixMock: PaymentPixEntity = {
  ...paymentMock,
  code: '65465',
  datePayment: new Date(),
};

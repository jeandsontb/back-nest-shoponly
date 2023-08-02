import { PaymentCardEntity } from '../entity/payment-card.entity';
import { paymentMock } from './payment.mock';

export const paymentCreditCardMock: PaymentCardEntity = {
  ...paymentMock,
  amountPayments: 555,
};

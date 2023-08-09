import { paymentPixMock } from '../../payment/__mocks__/payment-pix.mock';
import { addressMock } from '../../address/__mocks__/address.mock';
import { CreateOrderDto } from '../dto/create-order.dto';
import { paymentCreditCardMock } from '../../payment/__mocks__/payment-credit.mock';

export const createOrderPixMock: CreateOrderDto = {
  addressId: addressMock.id,
  codePix: paymentPixMock.code,
  datePayment: '2023-01-01',
};

export const createOrderCreditCardMock: CreateOrderDto = {
  addressId: addressMock.id,
  amountPayments: paymentCreditCardMock.amountPayments,
};

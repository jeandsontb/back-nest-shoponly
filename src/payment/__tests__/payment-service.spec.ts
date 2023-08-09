import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from '../payment.service';
import { Repository } from 'typeorm';
import { PaymentEntity } from '../entity/payment.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { paymentMock } from '../__mocks__/payment.mock';
import {
  createOrderCreditCardMock,
  createOrderPixMock,
} from '../../order/__mocks__/create-order.mock';
import { productMock } from '../../product/__mocks__/product.mock';
import { cartMock } from '../../cart/__mocks__/cart.mock';
import { paymentPixMock } from '../__mocks__/payment-pix.mock';
import { PaymentPixEntity } from '../entity/payment-pix.entity';
import { PaymentCardEntity } from '../entity/payment-card.entity';
import { paymentCreditCardMock } from '../__mocks__/payment-credit.mock';
import { BadRequestException } from '@nestjs/common';

describe('OrderService', () => {
  let service: PaymentService;
  let paymentRepository: Repository<PaymentEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(PaymentEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(paymentMock),
          },
        },
        PaymentService,
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    paymentRepository = module.get<Repository<PaymentEntity>>(
      getRepositoryToken(PaymentEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(paymentRepository).toBeDefined();
  });

  it('should save payment pix in DB', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');
    const payment = await service.createPayment(
      createOrderPixMock,
      [productMock],
      cartMock,
    );

    const savePayment: PaymentPixEntity = spy.mock
      .calls[0][0] as PaymentPixEntity;

    expect(payment).toEqual(paymentMock);
    expect(savePayment.code).toEqual(paymentPixMock.code);
    expect(savePayment.datePayment).toEqual(paymentPixMock.datePayment);
  });

  it('should save credit card in DB', async () => {
    const spy = jest.spyOn(paymentRepository, 'save');
    const payment = await service.createPayment(
      createOrderCreditCardMock,
      [productMock],
      cartMock,
    );

    const savePayment: PaymentCardEntity = spy.mock
      .calls[0][0] as PaymentCardEntity;

    expect(payment).toEqual(paymentMock);
    expect(savePayment.amountPayments).toEqual(
      paymentCreditCardMock.amountPayments,
    );
  });

  it('should return exception in not send data', async () => {
    expect(
      service.createPayment(
        {
          addressId: createOrderCreditCardMock.addressId,
        },
        [productMock],
        cartMock,
      ),
    ).rejects.toThrowError(BadRequestException);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../order.service';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entity/order.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaymentService } from '../../payment/payment.service';
import { CartService } from '../../cart/cart.service';
import { OrderProductService } from '../../order-product/order-product.service';
import { ProductService } from '../../product/product.service';
import { orderMock } from '../__mocks__/order.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { NotFoundException } from '@nestjs/common';
import { orderProductMock } from '../../order-product/__mocks__/order-product.mock';
import { cartMock } from '../../cart/__mocks__/cart.mock';
import { productMock } from '../../product/__mocks__/product.mock';
import { cartProductMock } from '../../cart-product/__mocks__/product-cart.mock';
import { createOrderPixMock } from '../__mocks__/create-order.mock';
import { paymentMock } from '../../payment/__mocks__/payment.mock';

jest.useRealTimers().setSystemTime(new Date('2023-08-17'));

describe('OrderService', () => {
  let service: OrderService;
  let paymentService: PaymentService;
  let cartService: CartService;
  let orderProductService: OrderProductService;
  let productService: ProductService;
  let orderRepository: Repository<OrderEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: PaymentService,
          useValue: {
            createPayment: jest.fn().mockResolvedValue(paymentMock),
          },
        },
        {
          provide: CartService,
          useValue: {
            getCartUserById: jest.fn().mockResolvedValue({
              ...cartMock,
              cartProduct: [cartProductMock],
            }),
            clearCart: jest.fn(),
          },
        },
        {
          provide: OrderProductService,
          useValue: {
            createOrderProduct: jest.fn().mockResolvedValue(orderProductMock),
          },
        },
        {
          provide: ProductService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([productMock]),
          },
        },
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([orderMock]),
            save: jest.fn().mockResolvedValue(orderMock),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    paymentService = module.get<PaymentService>(PaymentService);
    cartService = module.get<CartService>(CartService);
    orderProductService = module.get<OrderProductService>(OrderProductService);
    productService = module.get<ProductService>(ProductService);
    orderRepository = module.get<Repository<OrderEntity>>(
      getRepositoryToken(OrderEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(paymentService).toBeDefined();
    expect(cartService).toBeDefined();
    expect(orderProductService).toBeDefined();
    expect(productService).toBeDefined();
    expect(orderRepository).toBeDefined();
  });

  it('should return orders in getOrdersByUserId', async () => {
    const spy = jest.spyOn(orderRepository, 'find');
    const orders = await service.getOrdersByUserId(userEntityMock.id);
    expect(orders).toEqual([orderMock]);
    expect(spy.mock.calls[0][0]).toEqual({
      where: {
        userId: userEntityMock.id,
        id: undefined,
      },
      relations: {
        address: {
          city: {
            state: true,
          },
        },
        ordersProduct: {
          product: true,
        },
        payment: {
          paymentStatus: true,
        },
        user: false,
      },
    });
  });

  it('should return NotFoundException in find return empty', async () => {
    jest.spyOn(orderRepository, 'find').mockResolvedValue([]);
    expect(service.getOrdersByUserId(userEntityMock.id)).rejects.toThrowError(
      NotFoundException,
    );
  });

  // it('should call createOrderProduct amount cartProduct in cart', async () => {
  //   const spyOrderProduct = jest.spyOn(
  //     orderProductService,
  //     'createOrderProduct',
  //   );

  //   const createOrderProductUsingCart =
  //     await service.createOrderProductUsingCart(
  //       {
  //         ...cartMock,
  //         cartProduct: [cartProductMock, cartProductMock],
  //       },
  //       orderMock.id,
  //       [productMock],
  //     );

  //   expect(createOrderProductUsingCart).toEqual([
  //     orderProductMock,
  //     orderProductMock,
  //   ]);
  //   expect(spyOrderProduct.mock.calls.length).toEqual(2);
  // });

  it('should return order in saveOrder', async () => {
    const spy = jest.spyOn(orderRepository, 'save');
    const order = await service.saveOrder(
      createOrderPixMock,
      userEntityMock.id,
      paymentMock,
    );

    expect(order).toEqual(orderMock);
    expect(spy.mock.calls[0][0]).toEqual({
      addressId: createOrderPixMock.addressId,
      date: new Date(),
      paymentId: paymentMock.id,
      userId: userEntityMock.id,
    });
  });

  it('should exeption in error save', async () => {
    jest.spyOn(orderRepository, 'save').mockRejectedValue(new Error());

    expect(
      service.saveOrder(createOrderPixMock, userEntityMock.id, paymentMock),
    ).rejects.toThrowError();
  });

  // it('should return order in create order success', async () => {
  //   const spyService = jest.spyOn(cartService, 'getCartUserById');
  //   const spyServiceClear = jest.spyOn(cartService, 'clearCart');
  //   const spyProductService = jest.spyOn(productService, 'getAll');
  //   const spyPaymentService = jest.spyOn(paymentService, 'createPayment');
  //   const spyOrderRepository = jest.spyOn(orderRepository, 'save');
  //   const spyOrderService = jest.spyOn(
  //     orderProductService,
  //     'createOrderProduct',
  //   );

  //   const order = await service.createOrder(
  //     createOrderPixMock,
  //     userEntityMock.id,
  //   );
  //   expect(order).toEqual(orderMock);
  //   expect(spyService.mock.calls.length).toEqual(1);
  //   expect(spyProductService.mock.calls.length).toEqual(1);
  //   expect(spyPaymentService.mock.calls.length).toEqual(1);
  //   expect(spyOrderRepository.mock.calls.length).toEqual(1);
  //   expect(spyOrderService.mock.calls.length).toEqual(1);
  //   expect(spyServiceClear.mock.calls.length).toEqual(1);
  // });

  it('should return orders', async () => {
    const spy = jest.spyOn(orderRepository, 'find');
    const orders = await service.getAllOrders();

    expect(orders).toEqual([orderMock]);
    expect(spy.mock.calls[0][0]).toEqual({
      relations: {
        user: true,
      },
    });
  });

  it('should return error in NotFoundException', async () => {
    jest.spyOn(orderRepository, 'find').mockResolvedValue([]);
    expect(service.getAllOrders()).rejects.toThrowError(
      new NotFoundException('Ordens não existem'),
    );
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CartProductService } from '../cart-product.service';
import { ProductService } from '../../product/product.service';
import { Repository } from 'typeorm';
import { CartProductEntity } from '../entity/cart-product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../../product/__mocks__/product.mock';
import { returnDeleteMock } from '../../__mocks__/delete.mock';
import { cartMock } from '../../cart/__mocks__/cart.mock';
import { insertCartMock } from '../../cart/__mocks__/insert-cart.mock';
import { cartProductMock } from '../__mocks__/product-cart.mock';
import { NotFoundException } from '@nestjs/common';
import { updateCartMock } from '../../cart/__mocks__/update-cart.mock';

describe('CartProductService', () => {
  let service: CartProductService;
  let productService: ProductService;
  let cartProductRepository: Repository<CartProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: {
            getProductId: jest.fn().mockResolvedValue(productMock),
          },
        },
        {
          provide: getRepositoryToken(CartProductEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cartProductMock),
            save: jest.fn().mockResolvedValue(cartProductMock),
            delete: jest.fn().mockResolvedValue(returnDeleteMock),
          },
        },
        CartProductService,
      ],
    }).compile();

    service = module.get<CartProductService>(CartProductService);
    productService = module.get<ProductService>(ProductService);
    cartProductRepository = module.get<Repository<CartProductEntity>>(
      getRepositoryToken(CartProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productService).toBeDefined();
    expect(cartProductRepository).toBeDefined();
  });

  it('should delete result after delete product', async () => {
    const deleteResult = await service.deleteProductCart(
      productMock.id,
      cartMock.id,
    );
    expect(deleteResult).toEqual(returnDeleteMock);
  });

  it('should return error in exception delete', async () => {
    jest.spyOn(cartProductRepository, 'delete').mockRejectedValue(new Error());
    expect(
      service.deleteProductCart(productMock.id, cartMock.id),
    ).rejects.toThrowError();
  });

  it('should return CartProduct after create', async () => {
    const productCart = await service.createProductInCart(
      insertCartMock,
      cartMock.id,
    );
    expect(productCart).toEqual(cartProductMock);
  });

  it('should return erro in exception save', async () => {
    jest.spyOn(cartProductRepository, 'save').mockRejectedValue(new Error());
    expect(
      service.createProductInCart(insertCartMock, cartMock.id),
    ).rejects.toThrowError();
  });

  it('should return CartProduct if exists', async () => {
    const productCart = await service.verifyProductInCart(
      productMock.id,
      cartMock.id,
    );
    expect(productCart).toEqual(cartProductMock);
  });

  it('should return erro if not found', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockRejectedValue(new Error());
    expect(
      service.verifyProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError(Error);
  });

  it('should return erro in exception verifyProductInCart', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);
    expect(
      service.verifyProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return erro in exception insertProductInCart', async () => {
    jest
      .spyOn(productService, 'getProductId')
      .mockRejectedValue(new NotFoundException());
    expect(
      service.insertProductInCart(insertCartMock, cartMock),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return cart product if not exist in cart', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    const cartProduct = await service.insertProductInCart(
      insertCartMock,
      cartMock,
    );

    expect(cartProduct).toEqual(cartProductMock);
  });

  it('should return cart product if not exist in cart', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');

    const cartProduct = await service.insertProductInCart(
      insertCartMock,
      cartMock,
    );

    expect(cartProduct).toEqual(cartProductMock);
    expect(spy.mock.calls[0][0]).toEqual({
      ...cartProductMock,
      amount: cartProductMock.amount + insertCartMock.amount,
    });
  });

  it('should return cart product if not exist in cart', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    const cartProduct = await service.insertProductInCart(
      insertCartMock,
      cartMock,
    );

    expect(cartProduct).toEqual(cartProductMock);
    expect(spy.mock.calls[0][0].amount).toEqual(insertCartMock.amount);
  });

  it('should return erro in exception updateProductInCart', async () => {
    jest
      .spyOn(productService, 'getProductId')
      .mockRejectedValue(new NotFoundException());
    expect(
      service.updateProductInCart(updateCartMock, cartMock),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return cart product if not exist in cart (updateProductInCart)', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');
    const cartProduct = await service.updateProductInCart(
      updateCartMock,
      cartMock,
    );

    expect(cartProduct).toEqual(cartProductMock);
    expect(spy.mock.calls[0][0].amount).toEqual(updateCartMock.amount);
  });

  it('should return cart product if not exist in cart (updateProductInCart)', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.updateProductInCart(updateCartMock, cartMock),
    ).rejects.toThrowError(NotFoundException);
  });
});

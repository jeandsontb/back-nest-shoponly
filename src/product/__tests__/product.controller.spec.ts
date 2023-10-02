import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { productMock, productPaginationMock } from '../__mocks__/product.mock';
import { createProductMock } from '../__mocks__/create-product.mock';
import { returnDeleteMock } from '../../__mocks__/delete.mock';
import { updateProductMock } from '../__mocks__/update-product.mock';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([productMock]),
            createProduct: jest.fn().mockResolvedValue(productMock),
            updateProduct: jest.fn().mockResolvedValue(productMock),
            deleteProduct: jest.fn().mockResolvedValue(returnDeleteMock),
            getAllPage: jest.fn().mockResolvedValue(productPaginationMock),
          },
        },
      ],
      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(productService).toBeDefined();
  });

  it('should return product Entity in getAll', async () => {
    const product = await controller.getAll();
    expect(product).toEqual([
      {
        id: productMock.id,
        name: productMock.name,
        price: productMock.price,
        image: productMock.image,
      },
    ]);
  });

  it('should return product Entity in createProduct', async () => {
    const product = await controller.createProduct(createProductMock);
    expect(product).toEqual(productMock);
  });

  it('should return returnDelete in deleteProduct', async () => {
    const product = await controller.deleteProduct(productMock.id);
    expect(product).toEqual(returnDeleteMock);
  });

  it('should return ProductEntity in updateProduct', async () => {
    const product = await controller.updateProduct(
      productMock.id,
      updateProductMock,
    );
    expect(product).toEqual(productMock);
  });

  it('should return ProductEntity in getAllPage', async () => {
    const product = await controller.getAllPage();

    expect(product).toEqual(productPaginationMock);
  });

  it('should return ProductEntity in getAllPage', async () => {
    const mockSearch = 'mockSearch';
    const mockSize = 122;
    const mockPage = 123;

    const spy = jest.spyOn(productService, 'getAllPage');
    await controller.getAllPage(mockSearch, mockSize, mockPage);

    expect(spy.mock.calls[0][0]).toEqual(mockSearch);
    expect(spy.mock.calls[0][1]).toEqual(mockSize);
    expect(spy.mock.calls[0][2]).toEqual(mockPage);
  });
});

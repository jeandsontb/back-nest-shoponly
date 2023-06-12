import { Repository } from 'typeorm';
import { ProductService } from '../product.service';
import { ProductEntity } from '../entity/product.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../__mocks__/product.mock';
import { createProductMock } from '../__mocks__/create-product.mock';
import { CategoryService } from '../../category/category.service';
import { categoryMock } from '../../category/__mocks__/category.mock';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<ProductEntity>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: CategoryService,
          useValue: {
            getCategoryById: jest.fn().mockResolvedValue(categoryMock),
          },
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            save: jest.fn().mockResolvedValue(productMock),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    categoryService = module.get<CategoryService>(CategoryService);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  it('should return all product', async () => {
    const products = await service.getAll();
    expect(products).toEqual([productMock]);
  });

  it('should return error if product empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue([]);
    expect(service.getAll()).rejects.toThrowError();
  });

  it('should return error in exception', async () => {
    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());
    expect(service.getAll()).rejects.toThrowError();
  });

  it('should return procuct after insert in DB', async () => {
    const product = await service.createProduct(createProductMock);
    expect(product).toEqual(productMock);
  });

  it('should return exception procuct', async () => {
    jest
      .spyOn(categoryService, 'getCategoryById')
      .mockRejectedValue(new Error());
    expect(service.createProduct(createProductMock)).rejects.toThrowError();
  });
});

import { Repository } from 'typeorm';
import { CategoryService } from '../category.service';
import { CategoryEntity } from '../entity/category.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { categoryMock } from '../__mocks__/category.mock';
import { createCagetoryMock } from '../__mocks__/create-category.mock';
import { ProductService } from '../../product/product.service';
import { countProductMock } from '../../product/__mocks__/count-product.mock';
import { ReadCategoryDto } from '../dto/head-category.dto';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<CategoryEntity>;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: ProductService,
          useValue: {
            countProductsByCategoryId: jest
              .fn()
              .mockResolvedValue([countProductMock]),
          },
        },
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(categoryMock),
            find: jest.fn().mockResolvedValue([categoryMock]),
            save: jest.fn().mockResolvedValue(categoryMock),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    productService = module.get<ProductService>(ProductService);
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productService).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  it('should return list category', async () => {
    const categories = await service.getAllCategories();

    expect(categories).toEqual([
      new ReadCategoryDto(categoryMock, countProductMock.total),
    ]);
  });

  it('should return error in list category empty', async () => {
    jest.spyOn(categoryRepository, 'find').mockResolvedValue([]);

    expect(service.getAllCategories()).rejects.toThrowError();
  });

  it('should return error in list category exception', async () => {
    jest.spyOn(categoryRepository, 'find').mockRejectedValue(new Error());

    expect(service.getAllCategories()).rejects.toThrowError();
  });

  it('should return error in if exists category name', async () => {
    expect(service.createCategory(createCagetoryMock)).rejects.toThrowError();
  });

  it('should return category after save', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);
    const category = await service.createCategory(createCagetoryMock);
    expect(category).toEqual(categoryMock);
  });

  it('should return error in exception', async () => {
    jest.spyOn(categoryRepository, 'save').mockRejectedValue(new Error());
    expect(service.createCategory(createCagetoryMock)).rejects.toThrowError();
  });

  it('should return category in find by name', async () => {
    const category = await service.getCategoryByName(categoryMock.name);
    expect(category).toEqual(categoryMock);
  });

  it('should return category in find by name', async () => {
    const category = await service.getCategoryByName(categoryMock.name);
    expect(category).toEqual(categoryMock);
  });

  it('should return error if category find by name empty', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.getCategoryByName(categoryMock.name)).rejects.toThrowError();
  });

  it('should return  category in getById', async () => {
    const category = await service.getCategoryById(categoryMock.id);
    expect(category).toEqual(categoryMock);
  });

  it('should return in not found  category id', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.getCategoryById(categoryMock.id)).rejects.toThrowError();
  });
});

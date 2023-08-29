import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';
import { categoryMock } from '../__mocks__/category.mock';
import { createCagetoryMock } from '../__mocks__/create-category.mock';

describe('CategoryController', () => {
  let controller: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CategoryService,
          useValue: {
            getAllCategories: jest.fn().mockResolvedValue([categoryMock]),
            createCategory: jest.fn().mockResolvedValue(categoryMock),
          },
        },
      ],
      controllers: [CategoryController],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  it('should category Entity in getAllCategories', async () => {
    const category = await controller.getAllCategories();
    expect(category).toEqual([categoryMock]);
  });

  it('should return category Entity in createCategory', async () => {
    const category = await controller.createCategory(createCagetoryMock);
    expect(category).toEqual(categoryMock);
  });
});

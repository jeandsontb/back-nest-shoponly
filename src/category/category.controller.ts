import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReadCategoryDto } from './dto/head-category.dto';
import { CategoryService } from './category.service';
import { Roles } from '../decorators/roles.decorators';
import { UserTypeRole } from '../user/enum/user-type.enum';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEntity } from './entity/category.entity';

@Roles(UserTypeRole.Admin, UserTypeRole.User)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<ReadCategoryDto[]> {
    return await this.categoryService.getAllCategories();
  }

  @Roles(UserTypeRole.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createCategory(
    @Body() createCategory: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategory);
  }
}

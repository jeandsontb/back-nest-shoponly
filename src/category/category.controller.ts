import { Controller, Get } from '@nestjs/common';
import { ReadCategoryDto } from './dto/head-category.dto';
import { CategoryService } from './category.service';
import { Roles } from 'src/decorators/roles.decorators';
import { UserTypeRole } from 'src/user/enum/user-type.enum';

@Roles(UserTypeRole.Admin, UserTypeRole.User)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<ReadCategoryDto[]> {
    return (await this.categoryService.getAllCategories()).map(
      (category) => new ReadCategoryDto(category),
    );
  }
}

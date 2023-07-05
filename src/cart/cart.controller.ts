import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorators';
import { UserTypeRole } from 'src/user/enum/user-type.enum';
import { CartEntity } from './entity/cart.entity';
import { InsertCardDto } from './dto/insert-cart.dto';
import { CartService } from './cart.service';
import { UserId } from 'src/decorators/user-id.decorators';
import { ReadCartDto } from './dto/read-cart.dto';

@Roles(UserTypeRole.User, UserTypeRole.Admin)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async insertCart(
    @Body() insertCart: InsertCardDto,
    @UserId() userId: number,
  ): Promise<ReadCartDto> {
    return new ReadCartDto(
      await this.cartService.insertProductCart(insertCart, userId),
    );
  }
}

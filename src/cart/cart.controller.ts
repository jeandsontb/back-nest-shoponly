import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorators';
import { UserTypeRole } from '../user/enum/user-type.enum';
import { InsertCardDto } from './dto/insert-cart.dto';
import { CartService } from './cart.service';
import { UserId } from '../decorators/user-id.decorators';
import { ReadCartDto } from './dto/read-cart.dto';
import { DeleteResult } from 'typeorm';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Response } from 'express';

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

  @Get()
  async getCartByUserId(
    @UserId() userId: number,
    @Res({ passthrough: true }) res?: Response,
  ): Promise<ReadCartDto> {
    const cart = await this.cartService
      .getCartUserById(userId, true)
      .catch(() => undefined);

    if (cart) {
      return cart;
    }

    res.status(204).send();

    return;
  }

  @Delete()
  async clearCart(@UserId() userId: number): Promise<DeleteResult> {
    return this.cartService.clearCart(userId);
  }

  @Delete('/product/:product_id')
  async deleteProductCart(
    @Param('product_id') productId: number,
    @UserId() userId: number,
  ): Promise<DeleteResult> {
    return this.cartService.deleteProductCart(productId, userId);
  }

  @UsePipes(ValidationPipe)
  @Patch()
  async updateProductInCart(
    @Body() updateCart: UpdateCartDto,
    @UserId() userId: number,
  ): Promise<ReadCartDto> {
    return new ReadCartDto(
      await this.cartService.updateProductInCart(updateCart, userId),
    );
  }
}

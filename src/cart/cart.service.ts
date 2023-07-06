import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entity/cart.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InsertCardDto } from './dto/insert-cart.dto';
import { CartProductService } from 'src/cart-product/cart-product.service';

const LINE_AFFECTED = 1;

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly cartProductService: CartProductService,
  ) {}

  async getCartUserById(
    userId: number,
    isRelation?: boolean,
  ): Promise<CartEntity> {
    const relations = isRelation
      ? {
          cartProduct: {
            product: true,
          },
        }
      : undefined;

    const cart = await this.cartRepository.findOne({
      where: {
        userId,
        active: true,
      },
      relations,
    });

    if (!cart) {
      throw new NotFoundException('Carrinho de compras não localizado');
    }

    return cart;
  }

  async createCart(userId: number): Promise<CartEntity> {
    return this.cartRepository.save({
      active: true,
      userId,
    });
  }

  async insertProductCart(
    insertCartDto: InsertCardDto,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.getCartUserById(userId).catch(async () => {
      return this.createCart(userId);
    });

    await this.cartProductService.insertProductInCart(insertCartDto, cart);

    return cart;
  }

  async clearCart(userId: number): Promise<DeleteResult> {
    const cart = await this.getCartUserById(userId);

    await this.cartRepository.save({
      ...cart,
      active: false,
    });

    return {
      raw: [],
      affected: LINE_AFFECTED,
    };
  }
}

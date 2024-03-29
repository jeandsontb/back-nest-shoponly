import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductEntity } from './entity/cart-product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InsertCardDto } from '../cart/dto/insert-cart.dto';
import { CartEntity } from '../cart/entity/cart.entity';
import { ProductService } from '../product/product.service';
import { UpdateCartDto } from '../cart/dto/update-cart.dto';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProductEntity)
    private readonly cartProductRepository: Repository<CartProductEntity>,
    private readonly productService: ProductService,
  ) {}

  async verifyProductInCart(
    productId: number,
    cartId: number,
  ): Promise<CartProductEntity> {
    const cartProduct = await this.cartProductRepository.findOne({
      where: {
        productId,
        cartId,
      },
    });

    if (!cartProduct) {
      throw new NotFoundException('Produto não encontrado no carrinho');
    }

    return cartProduct;
  }

  async createProductInCart(
    insertCartDto: InsertCardDto,
    cartId: number,
  ): Promise<CartProductEntity> {
    return this.cartProductRepository.save({
      amount: insertCartDto.amount,
      productId: insertCartDto.productId,
      cartId,
    });
  }

  async insertProductInCart(
    insertCartDto: InsertCardDto,
    cart: CartEntity,
  ): Promise<CartProductEntity> {
    await this.productService.getProductId(insertCartDto.productId);

    const cartProduct = await this.verifyProductInCart(
      insertCartDto.productId,
      cart.id,
    ).catch(() => undefined);

    if (!cartProduct) {
      return this.createProductInCart(insertCartDto, cart.id);
    }

    return this.cartProductRepository.save({
      ...cartProduct,
      amount: cartProduct.amount + insertCartDto.amount,
    });
  }

  async deleteProductCart(
    productId: number,
    cartId: number,
  ): Promise<DeleteResult> {
    return this.cartProductRepository.delete({ productId, cartId });
  }

  async updateProductInCart(
    updateCartDto: UpdateCartDto,
    cart: CartEntity,
  ): Promise<CartProductEntity> {
    await this.productService.getProductId(updateCartDto.productId);

    const cartProduct = await this.verifyProductInCart(
      updateCartDto.productId,
      cart.id,
    );

    return this.cartProductRepository.save({
      ...cartProduct,
      amount: updateCartDto.amount,
    });
  }
}

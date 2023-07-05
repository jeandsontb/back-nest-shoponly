import { ReadCartDto } from 'src/cart/dto/read-cart.dto';
import { ReadProductDto } from 'src/product/dto/read-product.dto';
import { CartProductEntity } from '../entity/cart-product.entity';

export class ReadCartProductDto {
  id: number;
  cartId: number;
  productId: number;
  amount: number;
  product?: ReadProductDto;
  cart?: ReadCartDto;

  constructor(cartProduct: CartProductEntity) {
    (this.id = cartProduct.id),
      (this.cartId = cartProduct.cartId),
      (this.productId = cartProduct.productId),
      (this.amount = cartProduct.amount),
      (this.product = cartProduct.product
        ? new ReadProductDto(cartProduct.product)
        : undefined);
    this.cart = cartProduct.cart
      ? new ReadCartDto(cartProduct.cart)
      : undefined;
  }
}

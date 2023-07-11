import { CartEntity } from '../entity/cart.entity';
import { ReadCartProductDto } from '../../cart-product/dto/read-cart-product.dto';

export class ReadCartDto {
  id: number;
  cartProduct?: ReadCartProductDto[];

  constructor(cart: CartEntity) {
    (this.id = cart.id),
      (this.cartProduct = cart.cartProduct
        ? cart.cartProduct.map((product) => new ReadCartProductDto(product))
        : undefined);
  }
}

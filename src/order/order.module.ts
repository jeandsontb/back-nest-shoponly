import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entity/order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PaymentModule } from 'src/payment/payment.module';
import { CartModule } from 'src/cart/cart.module';
import { OrderProductModule } from 'src/order-product/order-product.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    PaymentModule,
    CartModule,
    OrderProductModule,
    ProductModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}

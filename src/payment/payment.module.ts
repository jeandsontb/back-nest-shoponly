import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Module({
  imports: [],
  providers: [PaymentService],
  controllers: [],
})
export class PaymentModule {}

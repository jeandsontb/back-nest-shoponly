import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentStatusEntity } from './entity/payment-status.entity';
import { PaymentStatusService } from './payment-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentStatusEntity])],
  providers: [PaymentStatusService],
  controllers: [],
})
export class PaymentStatusModule {}

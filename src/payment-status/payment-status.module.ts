import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentStatus } from './entity/payment-status.entity';
import { PaymentStatusService } from './payment-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentStatus])],
  providers: [PaymentStatusService],
  controllers: [],
})
export class PaymentStatusModule {}

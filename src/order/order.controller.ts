import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { UserId } from '../decorators/user-id.decorators';
import { OrderEntity } from './entity/order.entity';
import { Roles } from '../decorators/roles.decorators';
import { UserTypeRole } from '../user/enum/user-type.enum';
import { ReadOrderDto } from './dto/read-order.dto';

@Roles(UserTypeRole.Admin, UserTypeRole.User)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getOrdersByUserId(@UserId() userId: number): Promise<OrderEntity[]> {
    return this.orderService.getOrdersByUserId(userId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @UserId() userId: number,
  ): Promise<OrderEntity> {
    return this.orderService.createOrder(createOrderDto, userId);
  }

  @Roles(UserTypeRole.Admin)
  @Get('/all')
  async getAllOrders(): Promise<ReadOrderDto[]> {
    return (await this.orderService.getAllOrders()).map(
      (order) => new ReadOrderDto(order),
    );
  }

  @Roles(UserTypeRole.Admin)
  @Get('/:orderId')
  async getOrderById(@Param('orderId') orderId: number): Promise<ReadOrderDto> {
    return new ReadOrderDto(
      (await this.orderService.getOrdersByUserId(undefined, orderId))[0],
    );
  }
}

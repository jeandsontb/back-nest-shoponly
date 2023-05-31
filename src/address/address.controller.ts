import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/createAddress.dto';
import { AddressEntity } from './entity/address.entity';
import { Roles } from '../decorators/roles.decorators';
import { UserTypeRole } from '../user/enum/user-type.enum';
import { UserId } from '../decorators/user-id.decorators';

@Roles(UserTypeRole.User)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createUserDto: CreateAddressDto,
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createUserDto, userId);
  }

  @Get()
  async getAllAddress() {
    return this.addressService.getAllAddress();
  }
}

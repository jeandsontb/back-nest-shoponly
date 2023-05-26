import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { ReadUserDto } from './dto/readUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<UserEntity> {
    return this.userService.getUserByIdWithReferenceAddress(userId);
  }

  @Get()
  async getAllUsers(): Promise<ReadUserDto[]> {
    return (await this.userService.getAllUser()).map(
      (users) => new ReadUserDto(users),
    );
  }
}

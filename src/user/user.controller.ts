import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { ReadUserDto } from './dto/readUser.dto';
import { UpdatePasswordDto } from './dto/updateUser.dto';
import { UserId } from 'src/decorators/user-id.decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Get()
  async getAllUsers(): Promise<ReadUserDto[]> {
    return (await this.userService.getAllUser()).map(
      (users) => new ReadUserDto(users),
    );
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<ReadUserDto> {
    return new ReadUserDto(
      await this.userService.getUserByIdWithReferenceAddress(userId),
    );
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async updatePasswordUser(
    @UserId() userId: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    return this.userService.updatePasswordUser(userId, updatePasswordDto);
  }
}

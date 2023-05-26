import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ReadLoginDto } from './dto/readLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly autService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async login(@Body() loginDto: LoginDto): Promise<ReadLoginDto> {
    return this.autService.login(loginDto);
  }
}

import { ReadUserDto } from 'src/user/dto/readUser.dto';

export class ReadLoginDto {
  user: ReadUserDto;
  accessToken: string;
}

import { ReadUserDto } from '../../user/dto/readUser.dto';

export class ReadLoginDto {
  user: ReadUserDto;
  accessToken: string;
}

import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { JwtService } from '@nestjs/jwt';
import { jwtMock } from '../__mocks__/jwt.mocks';
import { loginMock } from '../__mocks__/login-user.mock';
import { ReadUserDto } from '../../user/dto/readUser.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            getUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => jwtMock,
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user if password and email valid', async () => {
    const user = await service.login(loginMock);

    expect(user).toEqual({
      accessToken: jwtMock,
      user: new ReadUserDto(userEntityMock),
    });
  });

  it('should return user if password invalid and email valid', async () => {
    expect(
      service.login({ ...loginMock, password: '54265' }),
    ).rejects.toThrowError();
  });

  it('should return user if password valid and email invalid', async () => {
    jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(undefined);

    expect(service.login(loginMock)).rejects.toThrowError();
  });

  it('should return error in UserService', async () => {
    jest.spyOn(userService, 'getUserByEmail').mockRejectedValue(new Error());

    expect(service.login(loginMock)).rejects.toThrowError();
  });
});

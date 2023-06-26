import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMock } from '../__mocks__/user.mock';
import { createUserMock } from '../__mocks__/createUser.mock';
import { updatePasswordMock } from '../__mocks__/update-user.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return in getUserByEmail', async () => {
    const user = await service.getUserByEmail(userEntityMock.email);
    expect(user).toEqual(userEntityMock);
  });

  it('should return error in getUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.getUserByEmail(userEntityMock.email)).rejects.toThrowError();
  });

  it('should return error in getUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.getUserByEmail(userEntityMock.email)).rejects.toThrowError();
  });

  it('should return in getUserByEmail (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
    expect(service.getUserByEmail(userEntityMock.email)).rejects.toThrowError();
  });

  it('should return error in getUserById', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.getUserById(userEntityMock.id)).rejects.toThrowError();
  });

  it('should return in getUserById (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
    expect(service.getUserById(userEntityMock.id)).rejects.toThrowError();
  });

  it('should return user in getUserByIdWithReferenceAddress', async () => {
    const user = await service.getUserByIdWithReferenceAddress(
      userEntityMock.id,
    );
    expect(user).toEqual(userEntityMock);
  });

  it('should return error if user exists', async () => {
    expect(service.createUser(createUserMock)).rejects.toThrowError();
  });

  it('should return user if not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    const user = await service.createUser(createUserMock);
    expect(user).toEqual(userEntityMock);
  });

  it('should return update user in password', async () => {
    const user = await service.updatePasswordUser(
      userEntityMock.id,
      updatePasswordMock,
    );
    expect(user).toEqual(userEntityMock);
  });

  it('should return invalid in password error', async () => {
    expect(
      service.updatePasswordUser(userEntityMock.id, updatePasswordMock),
    ).rejects.toThrowError();
  });

  it('should return error in password not exists', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.updatePasswordUser(userEntityMock.id, updatePasswordMock),
    ).rejects.toThrowError();
  });
});

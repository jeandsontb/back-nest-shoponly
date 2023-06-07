import { Repository } from 'typeorm';
import { AddressService } from '../address.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressEntity } from '../entity/address.entity';
import { addressMock } from '../__mocks__/address.mock';
import { UserService } from '../../user/user.service';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { CityService } from '../../city/city.service';
import { cityMock } from '../../city/__mocks__/city.mock';
import { createAddressMock } from '../__mocks__/create.address.mock';

describe('AddressService', () => {
  let service: AddressService;
  let addressRepository: Repository<AddressEntity>;
  let userService: UserService;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: UserService,
          useValue: {
            getUserById: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            getCityById: jest.fn().mockResolvedValue(cityMock),
          },
        },
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressMock),
            find: jest.fn().mockResolvedValue([addressMock]),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(cityService).toBeDefined();
    expect(addressRepository).toBeDefined();
  });

  it('should be address after save', async () => {
    const address = await service.createAddress(
      createAddressMock,
      userEntityMock.id,
    );
    expect(address).toEqual(addressMock);
  });

  it('should be error if exeption in userService', async () => {
    jest.spyOn(userService, 'getUserById').mockRejectedValueOnce(new Error());
    expect(
      service.createAddress(createAddressMock, userEntityMock.id),
    ).rejects.toThrowError();
  });

  it('should be error if exeption in cityService', async () => {
    jest.spyOn(cityService, 'getCityById').mockRejectedValueOnce(new Error());
    expect(
      service.createAddress(createAddressMock, userEntityMock.id),
    ).rejects.toThrowError();
  });

  // DDD
  it('should return all address to user', async () => {
    const addresses = await service.getAddressByUserId(userEntityMock.id);
    expect(addresses).toEqual([addressMock]);
  });

  it('should return not found if not address registred', async () => {
    jest.spyOn(addressRepository, 'find').mockResolvedValue(undefined);
    expect(
      service.getAddressByUserId(userEntityMock.id),
    ).rejects.toThrowError();
  });
});

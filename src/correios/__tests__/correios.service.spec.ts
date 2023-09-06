import { Test, TestingModule } from '@nestjs/testing';
import { CorreiosService } from '../correios.service';

describe('CorreiosService', () => {
  let service: CorreiosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CorreiosService],
    }).compile();

    service = module.get<CorreiosService>(CorreiosService);
  });

  it('Shoud be defined', () => {
    expect(service).toBeDefined();
  });
});

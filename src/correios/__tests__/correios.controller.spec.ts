import { Test, TestingModule } from '@nestjs/testing';
import { CorreiosController } from '../correios.controller';

describe('CorreiosController', () => {
  let controller: CorreiosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CorreiosController],
    }).compile();

    controller = module.get<CorreiosController>(CorreiosController);
  });

  it('Shoud be defined', () => {
    expect(controller).toBeDefined();
  });
});

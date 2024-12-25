import { Test, TestingModule } from '@nestjs/testing';
import { ControleService } from './controle.service';

describe('ControleService', () => {
  let service: ControleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControleService],
    }).compile();

    service = module.get<ControleService>(ControleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

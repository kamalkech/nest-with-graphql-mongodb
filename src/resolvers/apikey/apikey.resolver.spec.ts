import { Test, TestingModule } from '@nestjs/testing';
import { ApikeyResolver } from './apikey.resolver';

describe('ApikeyResolver', () => {
  let resolver: ApikeyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApikeyResolver],
    }).compile();

    resolver = module.get<ApikeyResolver>(ApikeyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

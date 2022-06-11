import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from '../customers/customers.service';
import { DriversService } from '../drivers/drivers.service';
import { ScoreService } from '../score/score.service';
import { MatchService } from './match.service';

describe('CustomersService', () => {
  let service: MatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchService,
        {
          provide: CustomersService,
          useValue: {
            findAll() {
              return [{ id: 1, name: 'Mohamed Customer', rides: 3 }];
            },
          },
        },
        {
          provide: DriversService,
          useValue: {
            findAll() {
              return [{ id: 1, name: 'Mohamed Customer', rides: 3 }];
            },
          },
        },
        {
          provide: ScoreService,
          useValue: {
            calculateTotalScore() {
              return 5;
            },
          },
        },
      ],
    }).compile();

    service = module.get<MatchService>(MatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call calcualteTotalScore', async () => {
    const result = await service.match();
    expect(result).toHaveProperty('matchedPairs');
    expect(result).toHaveProperty('unMatchedCustomers');
    expect(result).toHaveProperty('idleDrivers');
  });
});

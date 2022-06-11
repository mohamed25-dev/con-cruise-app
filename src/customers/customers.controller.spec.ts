import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

describe('CustomersController', () => {
  let controller: CustomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersService,
          useValue: {
            findOne() {
              return { id: 1, name: 'Mohamed Customer', rides: 3 };
            },
            findAll() {
              return [{ id: 1, name: 'Mohamed Customer', rides: 3 }];
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the customer with id 1', async () => {
    const customer = await controller.findOne('1');
    expect(customer.id).toBe(1);
  });

  it('should return array of customers', async () => {
    const customers = await controller.findAll();
    expect(customers).toEqual([{ id: 1, name: 'Mohamed Customer', rides: 3 }]);
  });
});

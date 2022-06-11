import munkres from 'munkres-js';
import { Injectable } from '@nestjs/common';
import { CustomersService } from '../customers/customers.service';
import { DriversService } from '../drivers/drivers.service';
import { ScoreService } from '../score/score.service';

@Injectable()
export class MatchService {
  constructor(
    private readonly customersService: CustomersService,
    private readonly scoreService: ScoreService,
    private readonly driversService: DriversService,
  ) {}

  async match() {
    const customers = await this.customersService.findAll();
    const drivers = await this.driversService.findAll();

    const matrix = [];

    for (const customer of customers) {
      const customerDrivers = [];
      for (const driver of drivers) {
        const totalScore = this.scoreService.calculateTotalScore(
          customer,
          driver,
        );
        customerDrivers.push(totalScore);
      }

      matrix.push(customerDrivers);
    }

    const pairs = munkres(matrix);

    const unMatchedCustomers = this.getUnMatchedCustomers(customers, pairs);
    const idleDrivers = this.getIdleDrivers(drivers, pairs);

    return {
      matchedPairs: pairs,
      unMatchedCustomers,
      idleDrivers,
    };
  }

  private getUnMatchedCustomers(customers, pairs) {
    const matchedCustomers = pairs.map(([c]) => c);

    const unMatchedCustomers = customers.filter(
      (customer, index) => matchedCustomers.indexOf(index) < 0,
    );

    return unMatchedCustomers;
  }

  private getIdleDrivers(drivers, pairs) {
    const assignedDrivers = pairs.map(([, d]) => d);
    const idleDrivers = drivers.filter(
      (driver, index) => assignedDrivers.indexOf(index) < 0,
    );

    return idleDrivers;
  }
}

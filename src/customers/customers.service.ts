import { writeFile } from 'fs/promises';
import { Injectable, NotFoundException } from '@nestjs/common';
import customers from '../data/customers.json';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './customers.interface';

@Injectable()
export class CustomersService {
  async create(createCustomerDto: CreateCustomerDto) {
    const customer = {
      id: customers[customers.length - 1].id + 1,
      name: createCustomerDto.name,
      locationLatitude: createCustomerDto.locationLatitude,
      locationLongitude: createCustomerDto.locationLongitude,
      numberOfRides: createCustomerDto.numberOfRides,
      rating: createCustomerDto.rating,
    };

    customers.push(customer);

    await this.writeToFile(customers);

    return customer;
  }

  async findAll() {
    return customers;
  }

  async findOne(id: number) {
    const index = await this.getCustomerIndex(id);
    if (index === -1) {
      throw new NotFoundException('Customer Not Found');
    }

    const customer = customers[index];
    if (!customer) {
      throw new NotFoundException('Customer Not Found');
    }

    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const index = await this.getCustomerIndex(id);
    if (index === -1) {
      throw new NotFoundException('Customer Not Found');
    }

    const customer = customers[index];

    if (updateCustomerDto.name) {
      customer.name = updateCustomerDto.name;
    }

    if (updateCustomerDto.locationLatitude) {
      customer.locationLatitude = updateCustomerDto.locationLatitude;
    }

    if (updateCustomerDto.locationLongitude) {
      customer.locationLongitude = updateCustomerDto.locationLongitude;
    }

    if (updateCustomerDto.rating) {
      customer.rating = updateCustomerDto.rating;
    }

    if (updateCustomerDto.numberOfRides) {
      customer.numberOfRides = updateCustomerDto.numberOfRides;
    }

    customers[index] = customer;

    await this.writeToFile(customers);

    return customer;
  }

  async remove(id: number) {
    const index = await this.getCustomerIndex(id);
    if (index === -1) {
      throw new NotFoundException('Customer Not Found');
    }

    customers.splice(index, 1);

    await this.writeToFile(customers);
  }

  async removeMany(ids: Array<number>) {
    const numberOfReceivedIds = ids.length;
    let numberOfDeletedCustomers = 0;

    for (const id of ids) {
      const index = await this.getCustomerIndex(id);
      if (index !== -1) {
        numberOfDeletedCustomers++;
        customers.splice(index, 1);
      }
    }

    await this.writeToFile(customers);

    return {
      numberOfReceivedIds,
      numberOfDeletedCustomers,
    };
  }

  private async getCustomerIndex(id) {
    for (let i = 0; i < customers.length; i++) {
      if (customers[i].id === id) {
        return i;
      }
    }

    return -1;
  }

  private async writeToFile(customers: Array<Customer>) {
    await writeFile(
      './src/data/customers.json',
      JSON.stringify(customers),
      'utf-8',
    );
  }
}

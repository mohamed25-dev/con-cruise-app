import { Injectable } from '@nestjs/common';
import drivers from '../data/drivers.json';

@Injectable()
export class DriversService {
  findAll() {
    return Promise.resolve(drivers);
  }
}

import { Injectable } from '@nestjs/common';
import { Customer } from '../customers/customers.interface';
import { Driver } from '../drivers/drivers.interface';

@Injectable()
export class ScoreService {
  calculateTotalScore(customer: Customer, driver: Driver) {
    //The algorithm find the min cost and we are trying to find
    // the max match, to achieve this we will substract MAX_SCORE from the total score.
    const MAX_SCORE = Math.pow(2, 10);

    const distance = this.getDistanceFromLatLonInKm(
      customer.locationLatitude,
      customer.locationLongitude,
      driver.locationLatitude,
      driver.locationLongitude,
    );

    const distanceScore = this.getDistanceScore(distance);
    const ratingScore = this.getRatingScore(customer.rating, driver.rating);
    const numberOfRidesScore = this.getNumberOfRidesScore(
      customer.numberOfRides,
      driver.numberOfRides,
    );

    return distanceScore + ratingScore + numberOfRidesScore - MAX_SCORE;
  }

  deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  getDistanceScore = (distance: number) => {
    if (distance <= 600) {
      return 7;
    }

    if (distance > 600 && distance <= 1000) {
      return 3;
    }

    return 0;
  };

  getRatingScore = (customerRating: number, driverRating: number) => {
    if (customerRating >= driverRating) {
      return 2;
    }

    return 0;
  };

  getNumberOfRidesScore = (customerRides: number, driverRides: number) => {
    if (customerRides <= 2 && driverRides >= 3) {
      return 5;
    }

    if (customerRides > 2 && driverRides < 3) {
      return 2;
    }

    return 0;
  };
}

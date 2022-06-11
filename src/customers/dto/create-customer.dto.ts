import { IsString, IsNumber } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  name: string;
  @IsNumber()
  locationLatitude: number;
  @IsNumber()
  locationLongitude: number;
  @IsNumber()
  numberOfRides: number;
  @IsNumber()
  rating: number;
}

export interface Driver {
  id: number;
  name?: string;
  locationLatitude?: number;
  locationLongitude?: number;
  numberOfRides: number;
  rating?: number;
}

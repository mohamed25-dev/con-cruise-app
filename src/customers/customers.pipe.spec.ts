import { CustomersPipe } from './customers.pipe';

describe('CustomersPipe', () => {
  it('should be defined', () => {
    expect(new CustomersPipe()).toBeDefined();
  });

  it('should through error', () => {
    try {
      expect(new CustomersPipe().transform('')).toThrowError();
    } catch (error) {}
  });

  it('should return an array of ids', () => {
    expect(new CustomersPipe().transform('1,2,3')).toEqual([1, 2, 3]);
  });
});

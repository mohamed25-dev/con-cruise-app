## Description
 - I used json files to store the data to keep things simple.
 - Using arrays to store the data is not the best option because searching for a customer or a driver by id costs O(n) while other data structures like hashmaps can reduce the cost to O(1) but again to keep things simple I went with the array option.
 - Regarding the matching I used the [Hungarian algorithm](https://en.wikipedia.org/wiki/Hungarian_algorithm) which solves the assignment problem, the only difference here is that the algorithm returns the min cost and for our case we are searching for the max score for matching a customer to a driver and that's easy to fix, just subtract a MAX number from all the scores in the matrix.
 - In a production ready app more improvements can be done, for example we won't match all customers to all drivers, we may use redis geospatial features to filter the drivers by their distance from a certain customer, adding a caching layer could be another way to reduce database hits, or we can emit an event with each customer or driver data change (location update, new customer added, driver status changed to online and so on ) so we can make matching on real time by a background service subscribed to these events.



## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run seed #seed the customers data
$ npm run start
```

## Running the CLI

```bash
$ npm run cli
```

## Test

```bash
# unit tests
$ npm run test

```

## Customers API
list customers
```
GET /customers
```

get customer by id
```
GET /customers/:id
```

update customer data
```
PATCH /customers/:id
```

create customer data
```
POST /customers
```

remove one customer by id
```
DELETE /customers/:id
```

remove many customers by ids
```
DELETE /customers?ids=1,2,3
```

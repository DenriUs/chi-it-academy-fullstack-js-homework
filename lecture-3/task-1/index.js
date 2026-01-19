class Transport {
  constructor(type, brand) {
    this.brand = brand;
    this.type = type;
  }

  ride() {
    throw new Error('ride() is not implemented');
  }

  stop() {
    throw new Error('stop() is not implemented');
  }
}

class Car extends Transport {
  constructor(brand) {
    super('car', brand);
  }

  ride() {
    console.log(`You are now driving a ${this.brand} ${this.type}`);
  }

  stop() {
    console.log(`You've stopped the ${this.brand} ${this.type}`);
  }
}

class Bike extends Transport {
  constructor(brand) {
    super('bike', brand);
  }

  ride(speed) {
    console.log(`You are now riding a ${this.brand} ${this.type}`);
  }

  stop() {
    console.log(`You've stopped the ${this.brand} ${this.type}`);
  }
}

class TransportFactory {
  static create(type, brand) {
    switch (type) {
      case 'car':
        return new Car(brand);
      case 'bike':
        return new Bike(brand);
      default:
        throw Error('Unknown transport type');
    }
  }
}

const car = TransportFactory.create('car', 'BMW');
const bike = TransportFactory.create('bike', 'Honda');

car.ride();
bike.ride();

car.stop();
bike.stop();

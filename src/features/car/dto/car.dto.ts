export class IntegrationMultipleCar {}

export class IntegrationCar {
  carId: number;
  merchantId: number;
  category: number;
  name: string;
  description?: string;
  brand: any;
  model?: string;
  cover: string;
  photos: string[];
  color?: string;
  state?: string;
  bodyType?: string;
  seat?: string;
  transmission?: string;
  fuel?: string;
  enginePower?: number;
  enginePowerUnit?: string;
  engineSize?: number;
  engineSizeUnit?: string;
  distanceDriven?: number;
  manufactureYear?: number;
  price: number; // Selling price
  minPrice: number;
  rate: number;
  rentPeriod: string;
  status: string;
  origin: string;
  isChecked: boolean;
  updatedBy?: number;
  note?: string;
  doors?: number;
  extraData?: any;
  createdAt?: Date;
  updatedAt?: Date;
  additionalAttributes?: Record<string, any>;
  type?: string;
  rentalPrice?: number;
  rentalType?: string;
  fuelConsumption?: number;
  carStore?: number;
  isHiddenPrice?: boolean;
  constructor(data: any = {}) {
    if (data) {
      this.carId = data.id;
      this.merchantId = data.merchant?.id;
      this.category = data?.category?.id;
      this.name = data.name;
      this.description = data.description;
      this.brand = data?.brand?.id || data?.brand;
      this.model = data.model;
      this.cover = data.cover;
      this.photos = data.photos;
      this.color = data.color;
      this.state = data.state;
      this.bodyType = data.bodyType;
      this.seat = data.seat;
      this.transmission = data.transmission;
      this.fuel = data.fuel;
      this.enginePower = data.enginePower;
      this.enginePowerUnit = data.enginePowerUnit;
      this.engineSize = data.engineSize;
      this.engineSizeUnit = data.engineSizeUnit;
      this.distanceDriven = data.distanceDriven;
      this.manufactureYear = data.manufactureYear;
      this.price = data.price;
      this.minPrice = data.minPrice;
      this.rentPeriod = data.rentPeriod;
      this.rate = data.rate;
      this.status = data.status;
      this.origin = data.origin;
      this.isChecked = data.isChecked;
      this.note = data.note;
      this.doors = data.doors;
      this.updatedBy = data.updatedBy;
      this.updatedAt = data.updatedAt;
      this.createdAt = data.createdAt;
      this.extraData = data.extraData;
      this.additionalAttributes = data.additionalAttributes;
      this.type = data.type;
      this.rentalType = data.rentalType;
      this.rentalPrice = data.rentalPrice;
      this.fuelConsumption = data.fuelConsumption;
      this.carStore = data.carStore;
      this.isHiddenPrice = data.isHiddenPrice;
    }
  }
}

export type ProductAttribute = {
  partType: string;
  isInstallationSupport: boolean;
  state: string;
};

export type Address = {
  id?: number;
  provinceId?: number;
  districtId?: number;
  wardId?: number;
};

export class IntegrateProduct {
  id?: number | string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  productBrand: string;
  cover: string;
  video: string;
  photos: string[];
  storeId: number;
  merchantId: number;
  address: Address;
  price: number;
  status: string;
  attribute: ProductAttribute;
  description: string;
  note: string;
  updatedBy: { user: number; userType: number };

  constructor(data?: Partial<IntegrateProduct>) {
    this.id = data.id;
    this.name = data?.name;
    this.name = data?.name;
    this.productBrand = data?.productBrand;
    this.cover = data?.cover;
    this.video = data?.video;
    this.photos = data?.photos;
    this.storeId = data?.storeId;
    this.merchantId = data?.merchantId;
    this.address = data?.address;
    this.price = data?.price;
    this.status = data?.status;
    this.attribute = data?.attribute;
    this.description = data?.description;
    this.note = data?.note;
    this.updatedBy = data?.updatedBy;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
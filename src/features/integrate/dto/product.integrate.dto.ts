export type ProductAttribute = {
  partType: string;
  isInstallationSupport: boolean;
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
  store: number;
  merchant: number;
  price: number;
  state: string;
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
    this.store = data?.store;
    this.merchant = data?.merchant;
    this.price = data?.price;
    this.state = data?.state;
    this.status = data?.status;
    this.attribute = data?.attribute;
    this.description = data?.description;
    this.note = data?.note;
    this.updatedBy = data?.updatedBy;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

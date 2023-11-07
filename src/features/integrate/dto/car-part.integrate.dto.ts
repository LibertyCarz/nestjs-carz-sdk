export class IntegrateCarPart {
  id?: number | string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  partType: string;
  partBrand: string;
  cover: string;
  video: string;
  photos: string[];
  store: number;
  merchant: number;
  price: number;
  state: string;
  status: string;
  isInstallationSupport: boolean;
  description: string;
  note: string;
  updatedBy: { user: number; userType: number };

  constructor(data?: Partial<IntegrateCarPart>) {
    this.id = data.id;
    this.name = data?.name;
    this.partType = data?.partType;
    this.partBrand = data?.partBrand;
    this.cover = data?.cover;
    this.video = data?.video;
    this.photos = data?.photos;
    this.store = data?.store;
    this.merchant = data?.merchant;
    this.price = data?.price;
    this.state = data?.state;
    this.status = data?.status;
    this.isInstallationSupport = data?.isInstallationSupport;
    this.description = data?.description;
    this.note = data?.note;
    this.updatedBy = data?.updatedBy;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

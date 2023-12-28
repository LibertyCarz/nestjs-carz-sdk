export class IntegrationBrand {
  brandId: number;
  name: Record<string, string>;
  order: number;
  status: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: any = {}) {
    this.brandId = data?.id;
    this.name = data?.translation || data?.name;
    this.status = data?.status;
    this.image = data?.image;
    this.order = data?.order;
    this.updatedAt = data?.updatedAt;
    this.updatedAt = data?.createdAt;
  }
}

export type ListBrandDTO = BaseRequestParams & {
  status?: string;
  name?: string;
  filter?: string;
  sort?: string;
};

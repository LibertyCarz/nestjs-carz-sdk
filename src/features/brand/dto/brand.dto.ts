export class IntegrationBrand {
  brandId: number;
  name: string;
  order: string;
  status: string;
  image: string;
  constructor(data: any = {}) {
    this.brandId = data?.id;
    this.name = data?.name;
    this.status = data?.status;
    this.image = data?.image;
  }
}

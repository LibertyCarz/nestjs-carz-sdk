export class IntegrationBrand {
  brandId: number;
  name: Record<string, string>;
  order: number;
  status: string;
  image: string;
  constructor(data: any = {}) {
    this.brandId = data?.id;
    this.name = data?.translation;
    this.status = data?.status;
    this.image = data?.image;
  }
}

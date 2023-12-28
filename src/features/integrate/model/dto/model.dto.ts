export class IntegrationModel {
  modelId: number;
  name: Record<string, string>;
  status: string;
  image: string;
  brand: number;
  manufactureYears: number[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: any = {}) {
    this.modelId = data?.id;
    this.name = data?.translation;
    this.status = data?.status;
    this.brand = data?.brand?.id || data?.brand;
    this.image = data?.image;
    this.manufactureYears = data?.manufactureYears;
    this.createdAt = data?.createdAt;
    this.updatedAt = data?.updatedAt;
  }
}
export type ListModelDTO = BaseRequestParams & {
  status?: string;
  name?: string;
  filter?: string;
  sort?: string;
  brand?: number;
};

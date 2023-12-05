export class IntegrationModel {
    modelId: number;
    name: Record<string, any>;;
    order: string;
    status: string;
    image: string;
    constructor(data: any = {}) {
        this.modelId = data?.id;
        this.name = data?.translation;
        this.status = data?.status;
        this.image = data?.image;
    }
}

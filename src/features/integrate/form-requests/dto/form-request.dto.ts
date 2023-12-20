import { BaseMongoose } from '../../../../types';

export type FormRequestAttribute = {
  attachment?: string;
  note?: string;
  updatedBy?: number;
};
export class FormRequest extends BaseMongoose {
  name?: string;
  phoneNumber?: string;
  email?: string;
  description?: string;
  type?: string;
  status?: string;
  refId?: number | string;
  attribute?: FormRequestAttribute;
  source?: any;

  constructor(data: any = null) {
    super();
    if (data) {
      this._id = data._id;
      this.name = data.name;
      this.phoneNumber = data.phoneNumber;
      this.email = data.email;
      this.description = data.description;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
      this.type = data.type;
      this.refId = data.refId;
      this.attribute = data.attribute;
    }
  }
}

export type ListFormRequestDTO = BaseListFilterDTO & {
  name?: string;
  startDate?: Date;
  end?: Date;
};

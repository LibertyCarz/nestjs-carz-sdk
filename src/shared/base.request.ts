export class BaseFilter {
  skip = 0;
  take = 10;
  user: number;
  userType: number;
  constructor(data?: Partial<BaseFilter>) {
    Object.assign(this, data);
  }
}

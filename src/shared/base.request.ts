export class BaseSdkFilter {
  skip = 0;
  take = 10;
  user: number;
  userType: number;
  constructor(data?: Partial<BaseSdkFilter>) {
    Object.assign(this, data);
  }
}

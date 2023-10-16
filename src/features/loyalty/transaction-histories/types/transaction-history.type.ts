export type TransactionHistory = BaseMongooseType & {
  user: number;
  userType: number;
  redemptionType: string;
  relate: string;
  relateModel: string;
  point: number;
  vouchers: any[];
  currentPoint: number;
};

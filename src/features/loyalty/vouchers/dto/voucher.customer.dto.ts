export type UserRedeemVoucherDTO = {
  userId: number;
  userType: number;
};

export type UseVoucherCodeDTO = {
  userId: number;
  userType: number;
  codeId: string;
};

export type BaseCart = {
  user: number;
  userType: number;
};

export type CartDto = {
  storeIds?: string[];
} & BaseCart;

type CartItem = {
  product: string;
  quantity: number;
  isAddToCart?: boolean;
};

export type AddCart = {
  items?: CartItem;
} & BaseCart;

export type CheckCartProductsDto = {
  ids?: string[];
} & BaseCart;

type BaseStore = {
  user: number;
  userType: number;
};

type Store = BaseStore & {
  // Res
  _id?: string;
  carStoreId?: number;
  name?: string;
};

type Product = {
  _id: string;
  name: string;
  cover: string;
  status: string;
  price: number;
};

export type ProductCart = {
  _id: string;
  cart?: string;
  product?: Product;
  __v: number;
  createdAt: string;
  quantity: number;
  store: Store;
  updatedAt: string;
};

type CartItem = {
  product: string;
  quantity: number;
  isAddToCart?: boolean;
};

export type AddCartDto = BaseStore & {
  items: CartItem[];
};

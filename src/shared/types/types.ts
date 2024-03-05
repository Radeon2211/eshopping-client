export type ApiErrorDataErrorObj = {
  properties: {
    message: string;
  };
};

export type ApiErrorData =
  | {
      errors: {
        [key: string]: ApiErrorDataErrorObj;
      };
    }
  | {
      message: string;
    }
  | {
      modifiedPaths: string[];
    };

type ProfileContacts = {
  email: boolean;
  phone: boolean;
};

export enum ProfileStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
}

export type Profile = {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  street: string;
  zipCode: string;
  city: string;
  country: string;
  phone: string;
  contacts: ProfileContacts;
  status: ProfileStatus;
  createdAt: string;
};

export type DeliveryAddress = {
  firstName: string;
  lastName: string;
  street: string;
  zipCode: string;
  city: string;
  country: string;
  phone: string;
};

export type OtherUser = {
  username: string;
  phone?: string;
  email?: string;
} | null;

export type SellerBuyerUser = {
  username: string;
} | null;

export type Product = {
  _id: string;
  quantitySold: number;
  buyerQuantity: number;
  name: string;
  price: number;
  quantity: number;
  condition: string;
  description: string;
  seller: SellerBuyerUser;
  createdAt: string;
  updatedAt: string;
  photo: boolean;
  __v: number;
};

export type CartItem = {
  _id: string;
  quantity: number;
  product: Product;
};

export type Cart = CartItem[];

export type ProfileWithCart = Profile & {
  cart: Cart;
};

export type OrderProductItem = {
  _id: string;
  name: string;
  photo: boolean;
  price: number;
  quantity: number;
  seller: SellerBuyerUser;
};

export type Transaction = OrderProductItem[];

export type HistoryProductItem = {
  _id: string;
  name: string;
  photo: boolean;
  price: number;
  quantity: number;
};

export type Order = {
  _id: string;
  seller: OtherUser;
  buyer: OtherUser;
  products: HistoryProductItem[];
  overallPrice: number;
  deliveryAddress: DeliveryAddress;
  createdAt: string;
  updatedAt: string;
  __v: 0;
};

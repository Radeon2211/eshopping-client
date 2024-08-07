import { AxiosError } from 'axios';
import { AuthReducerState } from '../../store/reducers/authReducer/authReducer';
import { ProductReducerState } from '../../store/reducers/productReducer/productReducer';
import { UiReducerState } from '../../store/reducers/uiReducer/uiReducer';

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
    }
  | {
      kind: string;
    };

type ProfileContacts = {
  email: boolean;
  phone: boolean;
};

export enum ProfileStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
}

export enum ModalType {
  ABOUT_WEBSITE = 'ABOUT_WEBSITE',
  ADD_ADMIN = 'ADD_ADMIN',
  ADD_PRODUCT = 'ADD_PRODUCT',
  BUY_PRODUCTS = 'BUY_PRODUCTS',
  CART_ITEM_ADDED = 'CART_ITEM_ADDED',
  CHANGE_NAME = 'CHANGE_NAME',
  CHANGE_EMAIL = 'CHANGE_EMAIL',
  CHANGE_USERNAME = 'CHANGE_USERNAME',
  CHANGE_PHONE_NUMBER = 'CHANGE_PHONE_NUMBER',
  CHANGE_ADDRESS = 'CHANGE_ADDRESS',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  CHANGE_CONTACTS = 'CHANGE_CONTACTS',
  CHANGE_DELIVERY_ADDRESS = 'CHANGE_DELIVERY_ADDRESS',
  CLEAR_CART = 'CLEAR_CART',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  EDIT_PRODUCT = 'EDIT_PRODUCT',
  LOGIN = 'LOGIN',
  REMOVE_ADMIN = 'REMOVE_ADMIN',
  RESET_PASSWORD = 'RESET_PASSWORD',
  PENDING_USER_INFO = 'PENDING_USER_INFO',
  SEND_VERIFICATION_LINK = 'SEND_VERIFICATION_LINK',
  SIGNUP = 'SIGNUP',
}

export enum ProductPageType {
  ALL_PRODUCTS = 'ALL_PRODUCTS',
  MY_PRODUCTS = 'MY_PRODUCTS',
  USER_PRODUCTS = 'USER_PRODUCTS',
}

export enum OrderType {
  PLACED_ORDERS = 'PLACED_ORDERS',
  SELL_HISTORY = 'SELL_HISTORY',
}

export enum UpdateCartAction {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  NUMBER = 'NUMBER',
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

export type AxiosErrorType = AxiosError<ApiErrorData>;

export type RootState = {
  auth: AuthReducerState;
  product: ProductReducerState;
  ui: UiReducerState;
};

export type PropsWithChildren<P = unknown> = P & { children: React.ReactNode };

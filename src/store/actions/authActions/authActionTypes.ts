import { DeliveryAddress } from '../../../shared/types/types';

export enum AuthAction {
  LOGOUT_USER = 'LOGOUT_USER',
  SET_PROFILE = 'SET_PROFILE',
  SET_DELIVERY_ADDRESS = 'SET_DELIVERY_ADDRESS',
  SET_CART = 'SET_CART',
  SET_TRANSACTION = 'SET_TRANSACTION',
  SET_PLACED_ORDERS = 'SET_PLACED_ORDERS',
  SET_SELL_HISTORY = 'SET_SELL_HISTORY',
  SET_ORDER_DETAILS = 'SET_ORDER_DETAILS',
  SET_OTHER_USER = 'SET_OTHER_USER',
}

export interface RegisterUserData {
  phone: string;
  contacts: {
    email: boolean;
    phone: boolean;
  };
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  street: string;
  zipCode: string;
  city: string;
}

export interface UpdateUserData {
  phone?: string;
  contacts?: {
    email: boolean;
    phone: boolean;
  };
  firstName?: string;
  lastName?: string;
  street?: string;
  zipCode?: string;
  city?: string;
  country?: string;
}

export interface ChangeEmailData {
  email: string;
  currentPassword: string;
}

export interface DeleteAccountData {
  currentPassword: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface ChangeDeliveryAddressData extends DeliveryAddress {
  onlyCurrentOrders?: boolean;
}

import { userStatuses } from '../../src/shared/constants';

export const adminUser = {
  firstName: 'User',
  lastName: 'Admin',
  username: 'userAdmin',
  email: 'user-admin@example.com',
  password: 'Pa$$w0rd',
  street: 'Szkolna 17',
  zipCode: '15-950',
  city: 'Białystok',
  country: 'Poland',
  phone: '+48 123456789',
  phoneNumber: '123456789',
  phonePrefixLabel: '+48 Poland',
  isAdmin: true,
  contacts: {
    email: true,
    phone: true,
  },
  status: userStatuses.ACTIVE,
};

export const activeUser = {
  firstName: 'User',
  lastName: 'Active',
  username: 'userActive',
  email: 'user-active@example.com',
  password: 'Pa$$w0rd',
  street: 'Kolejowa 111',
  zipCode: '00-051',
  city: 'Warsaw',
  country: 'Poland',
  phone: '+48 999-998-997',
  phoneNumber: '999-998-997',
  phonePrefixLabel: '+48 Poland',
  contacts: {
    email: false,
    phone: false,
  },
  status: userStatuses.ACTIVE,
  cart: [],
  tokens: [],
};

export const pendingUser = {
  firstName: 'User',
  lastName: 'Pending',
  username: 'userPending',
  email: 'user-pending@example.com',
  password: 'Pa$$w0rd',
  street: 'Square St. 66',
  zipCode: '35004',
  city: 'Leeds',
  country: 'United Kingdom',
  phone: '+44 111-222-3333',
  phoneNumber: '111-222-3333',
  phonePrefixLabel: '+44 United Kingdom',
  contacts: {
    email: true,
    phone: false,
  },
  status: userStatuses.PENDING,
  cart: [],
  tokens: [],
};

export const testUser = {
  firstName: 'Test',
  lastName: 'User',
  username: 'testuser',
  email: 'test@example.com',
  password: 'Pa$$w0rd',
  street: 'Kolejowa 99',
  zipCode: '77-400',
  city: 'Złotów',
  country: 'Poland',
  phone: '+48 345-678-192',
  phoneNumber: '345-678-192',
  phonePrefixLabel: '+48 Poland',
  contacts: {
    email: true,
    phone: false,
  },
};

import { userStatuses } from '../../src/shared/constants';

export const userOne = {
  firstName: 'User',
  lastName: 'One',
  username: 'user1',
  email: 'user1@example.com',
  password: 'Pa$$w0rd',
  street: 'Szkolna 17',
  zipCode: '15-950',
  city: 'Białystok',
  country: 'Poland',
  phone: '+48 123456789',
  contacts: {
    email: true,
    phone: true,
  },
  status: userStatuses.ACTIVE,
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

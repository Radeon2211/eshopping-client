import { userStatuses } from '../../src/shared/constants';

// eslint-disable-next-line import/prefer-default-export
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

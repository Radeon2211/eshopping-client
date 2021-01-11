import queryString from 'query-string';
import moment from 'moment';
import { listOfAreaCodes } from './constants';

export const getPhonePrefixAndNumber = (phone) => {
  const currentPhonePrefix = phone.split(' ')[0].split('+')[1];
  const phonePrefix = listOfAreaCodes.find(({ value }) => value === currentPhonePrefix);
  const phoneNumber = phone.split(' ')[1];
  return { phonePrefix, phoneNumber };
};

export const getChangedValues = (data, initialValues) => {
  return Object.entries(data)
    .filter(([key, value]) => {
      if (key === 'country' || key === 'phonePrefix') {
        return value.value !== initialValues[key].value;
      }
      return value !== initialValues[key];
    })
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
};

export const updateObject = (oldObject, updatedProps) => ({
  ...oldObject,
  ...updatedProps,
});

export const getErrorMessage = (error) => {
  let errorMessage = 'Something went wrong';
  if (error?.response?.data?.errors) {
    errorMessage = Object.values(error.response.data.errors)[0].properties.message;
  } else if (error?.response?.data?.message) {
    errorMessage = error.response.data.message;
  } else if (error?.response?.data?.modifiedPaths) {
    if (error.response.data.modifiedPaths.includes('cart')) {
      window.location.reload();
    }
  }
  return errorMessage;
};

const fileTypes = ['image/jpeg', 'image/png'];

export const isValidFileType = (type) => fileTypes.includes(type);

export const calculateFileSize = (size) => {
  if (size < 1024) {
    return `${size} bytes`;
  }
  if (size >= 1024 && size < 1048576) {
    return `${(size / 1024).toFixed(1)}KB`;
  }
  if (size >= 1048576) {
    return `${(size / 1048576).toFixed(1)}MB`;
  }
  return ``;
};

export const updateQueryParams = (currentQueryParams, nextPageNumber) => {
  const parsedQueryParams = queryString.parse(currentQueryParams);
  const correctQueryParams = {
    ...parsedQueryParams,
    p: nextPageNumber,
  };
  return queryString.stringify(correctQueryParams);
};

export const calculateNumberOfPages = (itemQuantity, maxQuantity) => {
  return Math.ceil(itemQuantity / maxQuantity);
};

export const formatPrice = (value) => {
  let minimumFractionDigits = 2;
  if (value % 1 === 0) minimumFractionDigits = 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits,
    maximumFractionDigits: 2,
  }).format(value);
};

export const roundOverallPrice = (value) => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

export const formatOrderDate = (date) => {
  return moment(date).format('D MMM YYYY, HH:mm');
};

export const validateURL = (url) => {
  const parsed = new URL(url);
  return ['https:', 'http:'].includes(parsed.protocol);
};

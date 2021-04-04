import queryString from 'query-string';
import moment from 'moment';
import roundTo from 'round-to';
import filesize from 'filesize';
import { listOfAreaCodes, defaultErrorMessage } from '../constants';

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
  let errorMessage = defaultErrorMessage;
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
  return filesize(size, { separator: ',', round: 2 });
};

export const getParamsWithoutPollution = (search) => {
  const parsedQueryParams = queryString.parse(search);
  const arrayQueryParams = Object.entries(parsedQueryParams).map(([key, value]) => {
    const correctValue = Array.isArray(value) ? value.slice(-1)[0] : value;
    return [key, correctValue];
  });
  const correctQueryParams = arrayQueryParams.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
  return correctQueryParams;
};

export const stringifyParamsWithOtherPage = (search, nextPageNumber) => {
  const parsedQueryParams = getParamsWithoutPollution(search);
  const correctQueryParams = {
    ...parsedQueryParams,
    p: nextPageNumber,
  };
  return queryString.stringify(correctQueryParams);
};

export const calculateNumberOfPages = (itemQuantity, maxQuantityPerPage) => {
  return Math.ceil(itemQuantity / maxQuantityPerPage);
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
  return roundTo.up(value, 2);
};

export const formatOrderDate = (date) => {
  return moment(date).format('D MMM YYYY, HH:mm');
};

export const validateURL = (url) => {
  const parsed = new URL(url);
  return ['https:', 'http:'].includes(parsed.protocol);
};

function MockFile() {}
MockFile.prototype.create = (name = 'mock.png', size = 1024, mimeType = 'image/png') => {
  const range = (count) => {
    let output = '';
    for (let i = 0; i < count; i += 1) {
      output += 'a';
    }
    return output;
  };

  const blob = new Blob([range(size)], { type: mimeType });
  blob.lastModifiedDate = new Date();
  blob.name = name;

  return blob;
};
export const mockFile = new MockFile();

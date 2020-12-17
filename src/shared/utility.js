import queryString from 'query-string';
import { getCountries } from 'country-fns';

export const listOfAreaCodes = getCountries().map(({ name, dial }) => {
  const finalValue = `+${dial} ${name.split('(')[0].trim()}`;
  return {
    value: dial,
    label: finalValue,
  };
});

export const listOfCountries = getCountries().map(({ name }) => {
  const finalValue = name.split('(')[0].trim();
  return {
    value: finalValue,
    label: finalValue,
  };
});

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
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

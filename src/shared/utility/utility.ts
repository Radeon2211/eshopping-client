import queryString from 'query-string';
import moment from 'moment';
import { filesize } from 'filesize';
import { listOfAreaCodes, defaultErrorMessage, defaultScrollToConfig } from '../constants';
import { ApiErrorDataErrorObj, AxiosErrorType } from '../types/types';

export const getPhonePrefixAndNumber = (phone: string) => {
  const currentPhonePrefix = phone.split(' ')[0].split('+')[1];
  const phonePrefix = listOfAreaCodes.find(({ value }) => value === currentPhonePrefix);
  const phoneNumber = phone.split(' ')[1];
  return { phonePrefix, phoneNumber };
};

type getChangedValuesParam = {
  [key: string]: string | { label: string; value: string }; // { label, value } object as value for "country" and "phonePrefix" form fields
};

export const getChangedValues = (
  data: getChangedValuesParam,
  initialValues: getChangedValuesParam,
) => {
  return Object.entries(data)
    .filter(([key, value]) => {
      const initialValue = initialValues[key];
      if (
        typeof value === 'object' &&
        value !== null &&
        initialValue &&
        typeof initialValue === 'object' &&
        'value' in initialValue
      ) {
        return value.value !== initialValue.value;
      }
      return value !== initialValue;
    })
    .reduce((acc: getChangedValuesParam, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
};

export function updateObject<T>(oldObject: T, updatedProps: Partial<T>): T {
  return {
    ...oldObject,
    ...updatedProps,
  };
}

export const getErrorMessage = (error: AxiosErrorType) => {
  let errorMessage = defaultErrorMessage;

  const data = error.response?.data;

  if (!data) return errorMessage;

  if ('errors' in data && typeof data.errors === 'object') {
    const errorObjects: ApiErrorDataErrorObj[] = Object.values(data.errors);
    errorMessage = errorObjects[0].properties.message;
  } else if ('message' in data && typeof data.message === 'string') {
    errorMessage = data.message;
  } else if ('modifiedPaths' in data && Array.isArray(data.modifiedPaths)) {
    if (data.modifiedPaths.includes('cart')) {
      window.location.reload();
    }
  }

  return errorMessage;
};

const fileTypes = ['image/jpeg', 'image/png'];

export const isValidFileType = (type: string) => fileTypes.includes(type);

export const calculateFileSize = (size: number) => {
  return filesize(size, { separator: ',', round: 2, standard: 'jedec' });
};

export const getParamsWithoutPollution = (search: string) => {
  const parsedQueryParams = queryString.parse(search);
  const arrayQueryParams = Object.entries(parsedQueryParams).map(([key, value]) => {
    const correctValue = Array.isArray(value) ? value.slice(-1)[0] : value;
    return [key, correctValue || ''];
  });
  const correctQueryParams = arrayQueryParams.reduce(
    (acc: { [key: string]: string }, [key, value]) => {
      acc[key] = value;
      return acc;
    },
    {},
  );
  return correctQueryParams;
};

export const stringifyParamsWithOtherPage = (search: string, nextPageNumber: number) => {
  const parsedQueryParams = getParamsWithoutPollution(search);
  const correctQueryParams = {
    ...parsedQueryParams,
    p: nextPageNumber,
  };
  return queryString.stringify(correctQueryParams);
};

export const calculateNumberOfPages = (itemQuantity: number, maxQuantityPerPage: number) => {
  return Math.ceil(itemQuantity / maxQuantityPerPage);
};

export const formatPrice = (value: number) => {
  let minimumFractionDigits = 2;
  if (value % 1 === 0) minimumFractionDigits = 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits,
    maximumFractionDigits: 2,
  }).format(value);
};

// source: https://stackoverflow.com/a/18358056
export const roundOverallPrice = (value: number) => {
  return +`${Math.ceil(+`${value}e+2`)}e-2`;
};

export const formatOrderDate = (date: Date | string) => {
  return moment(date).format('D MMM YYYY, HH:mm');
};

export const validateURL = (url: string) => {
  const parsed = new URL(url);
  return ['https:', 'http:'].includes(parsed.protocol);
};

export class MockFile {
  static create(
    name: string = 'mock.png',
    size: number = 1024,
    mimeType: string = 'image/png',
  ): Blob {
    const range = (count: number): string => {
      let output = '';
      for (let i = 0; i < count; i += 1) {
        output += 'a';
      }
      return output;
    };

    const blob: Blob = new Blob([range(size)], { type: mimeType });

    Object.defineProperty(blob, 'name', {
      value: name,
      writable: false,
    });

    return blob;
  }
}

export const scrollToTop = () => {
  window.scrollTo(defaultScrollToConfig);
};

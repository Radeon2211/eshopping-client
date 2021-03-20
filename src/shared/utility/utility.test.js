import { defaultErrorMessage } from '../constants';
import * as utility from './utility';

describe('getPhonePrefixAndNumber()', () => {
  it('Should get correct data for +7 19283746', () => {
    const { phoneNumber, phonePrefix } = utility.getPhonePrefixAndNumber('+7 19283746');
    expect(phoneNumber).toEqual('19283746');
    expect(phonePrefix).toEqual({
      value: '7',
      label: '+7 Kazakhstan',
    });
  });

  it('Should get correct data for +48 123456789', () => {
    const { phoneNumber, phonePrefix } = utility.getPhonePrefixAndNumber('+48 123456789');
    expect(phoneNumber).toEqual('123456789');
    expect(phonePrefix).toEqual({
      value: '48',
      label: '+48 Poland',
    });
  });

  it('Should get correct data for +355 98765432112', () => {
    const { phoneNumber, phonePrefix } = utility.getPhonePrefixAndNumber('+355 98765432112');
    expect(phoneNumber).toEqual('98765432112');
    expect(phonePrefix).toEqual({
      value: '355',
      label: '+355 Albania',
    });
  });

  it('Should get correct data for +1268 1234567', () => {
    const { phoneNumber, phonePrefix } = utility.getPhonePrefixAndNumber('+1268 1234567');
    expect(phoneNumber).toEqual('1234567');
    expect(phonePrefix).toEqual({
      value: '1268',
      label: '+1268 Antigua and Barbuda',
    });
  });
});

describe('getChangedValues()', () => {
  it('Should return everything expect zipCode and lastName', () => {
    const initialValues = {
      firstName: 'Jan',
      lastName: 'Nowak',
      street: 'Nowakowska 13',
      zipCode: '77-777',
      city: 'Bydgoszcz',
      country: {
        value: 'Poland',
        label: 'Poland',
      },
      phonePrefix: {
        value: '48',
        label: '+48 Poland',
      },
      phoneNumber: '123456789',
    };

    const newData = {
      firstName: 'Janek',
      lastName: 'Nowak',
      street: 'Novakowska 86',
      zipCode: '77-777',
      city: 'Moscow',
      country: {
        value: 'Russia',
        label: 'Russia',
      },
      phonePrefix: {
        value: '355',
        label: '+355 Albania',
      },
      phoneNumber: '987654321',
    };

    const changedValues = utility.getChangedValues(newData, initialValues);

    expect(changedValues).toEqual({
      firstName: 'Janek',
      street: 'Novakowska 86',
      city: 'Moscow',
      country: {
        value: 'Russia',
        label: 'Russia',
      },
      phonePrefix: {
        value: '355',
        label: '+355 Albania',
      },
      phoneNumber: '987654321',
    });
  });

  it('Should return only lastName and zipCode', () => {
    const initialValues = {
      firstName: 'Jan',
      lastName: 'Nowak',
      street: 'Nowakowska 13',
      zipCode: '77-777',
      city: 'Bydgoszcz',
      country: {
        value: 'Poland',
        label: 'Poland',
      },
      phonePrefix: {
        value: '48',
        label: '+48 Poland',
      },
      phoneNumber: '123456789',
    };

    const newData = {
      firstName: 'Jan',
      lastName: 'Nowakowski',
      street: 'Nowakowska 13',
      zipCode: '55-555',
      city: 'Bydgoszcz',
      country: {
        value: 'Poland',
        label: 'Poland',
      },
      phonePrefix: {
        value: '48',
        label: '+48 Poland',
      },
      phoneNumber: '123456789',
    };

    const changedValues = utility.getChangedValues(newData, initialValues);

    expect(changedValues).toEqual({
      lastName: 'Nowakowski',
      zipCode: '55-555',
    });
  });
});

describe('updateObject()', () => {
  it('Should update object correctly', () => {
    const initialObject = {
      products: [{ _id: 'p1' }],
      productCount: 1,
      productDetails: { _id: 'p1' },
      minPrice: 10,
      maxPrice: 10,
    };

    const updatedObject = utility.updateObject(initialObject, {
      products: [{ _id: 'p1' }, { _id: 'p2' }],
      productCount: 2,
      minPrice: 10,
      maxPrice: 20,
    });

    expect(updatedObject).toEqual({
      products: [{ _id: 'p1' }, { _id: 'p2' }],
      productCount: 2,
      productDetails: { _id: 'p1' },
      minPrice: 10,
      maxPrice: 20,
    });
  });
});

describe('getErrorMessage()', () => {
  it('Should get default message if neither statement passed', () => {
    const errorMessage = utility.getErrorMessage({});
    expect(errorMessage).toEqual(defaultErrorMessage);
  });

  it('Should get message in first if statement', () => {
    const errorMessage = utility.getErrorMessage({
      response: {
        data: {
          errors: {
            error1: {
              properties: {
                message: 'Incorrect credentials',
              },
            },
            error2: {
              properties: {
                message: 'You entered incorrect credentials',
              },
            },
          },
        },
      },
    });
    expect(errorMessage).toEqual('Incorrect credentials');
  });

  it('Should get message in second if statement', () => {
    const errorMessage = utility.getErrorMessage({
      response: {
        data: {
          message: 'You entered wrong credentials',
        },
      },
    });
    expect(errorMessage).toEqual('You entered wrong credentials');
  });

  it('Should get message in second if statement', () => {
    const errorMessage = utility.getErrorMessage({
      response: {
        data: {
          message: 'You entered wrong credentials',
        },
      },
    });
    expect(errorMessage).toEqual('You entered wrong credentials');
  });

  it('Should get default message if statement in third if statement not passed', () => {
    const errorMessage = utility.getErrorMessage({
      response: {
        data: {
          modifiedPaths: ['products'],
        },
      },
    });
    expect(errorMessage).toEqual(defaultErrorMessage);
  });

  it('Should reload page if statement in third if statement passed', () => {
    const reloadFn = jest.fn();
    const originalWindow = { ...window };
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => ({
      ...originalWindow,
      location: {
        ...originalWindow.location,
        reload: reloadFn,
      },
    }));

    expect(reloadFn).toHaveBeenCalledTimes(0);
    utility.getErrorMessage({
      response: {
        data: {
          modifiedPaths: ['cart'],
        },
      },
    });
    expect(reloadFn).toHaveBeenCalledTimes(1);
  });
});

describe('isValidFileType()', () => {
  it('Should get true for jpeg and png', () => {
    expect(utility.isValidFileType('image/jpeg')).toEqual(true);
    expect(utility.isValidFileType('image/png')).toEqual(true);
  });

  it('Should get false for other types than jpeg and png', () => {
    expect(utility.isValidFileType('text/plain')).toEqual(false);
    expect(utility.isValidFileType('audio/mpeg')).toEqual(false);
    expect(utility.isValidFileType('image/tiff')).toEqual(false);
    expect(utility.isValidFileType('image/webp')).toEqual(false);
    expect(utility.isValidFileType('image/svg+xml')).toEqual(false);
    expect(utility.isValidFileType('image/bmp')).toEqual(false);
    expect(utility.isValidFileType('image/gif')).toEqual(false);
  });
});

describe('calculateFileSize()', () => {
  it('Should return value in bytes if size is lower than 1024', () => {
    expect(utility.calculateFileSize(1023)).toEqual('1023 bytes');
  });

  it('Should return value in KB if size is between 1023 and 1048576', () => {
    expect(utility.calculateFileSize(1024)).toEqual('1KB');
    expect(utility.calculateFileSize(22222)).toEqual('21.7KB');
    expect(utility.calculateFileSize(800000)).toEqual('781.3KB');
    expect(utility.calculateFileSize(1048575)).toEqual('1024KB');
  });

  it('Should return value in MB if size is at least 1048576', () => {
    expect(utility.calculateFileSize(1048576)).toEqual('1MB');
    expect(utility.calculateFileSize(2222222)).toEqual('2.1MB');
    expect(utility.calculateFileSize(5675432)).toEqual('5.4MB');
  });
});

describe('getParamsWithoutPollution()', () => {
  it('Should get all params which are passed', () => {
    const correctParams = utility.getParamsWithoutPollution(
      '?p=1&name=testName&minPrice=10&maxPrice=20',
    );
    expect(correctParams).toEqual({
      p: '1',
      name: 'testName',
      minPrice: '10',
      maxPrice: '20',
    });
  });

  it('Should get params without repetition', () => {
    const correctParams = utility.getParamsWithoutPollution(
      '?p=1&name=nameOne&name=nameTwo&minPrice=10&maxPrice=20&minPrice=30&maxPrice=500&p=7',
    );
    expect(correctParams).toEqual({
      p: '7',
      name: 'nameTwo',
      minPrice: '30',
      maxPrice: '500',
    });
  });
});

describe('stringifyParamsWithOtherPage()', () => {
  it('Should get updated params if passed params are without repetition', () => {
    const stringifiedParams = utility.stringifyParamsWithOtherPage(
      '?p=1&name=testName&minPrice=10&maxPrice=20',
      3,
    );
    expect(stringifiedParams).toEqual('maxPrice=20&minPrice=10&name=testName&p=3');
  });

  it('Should get updated params if passed params are with repetition', () => {
    const stringifiedParams = utility.stringifyParamsWithOtherPage(
      '?p=1&name=nameOne&name=nameTwo&minPrice=10&maxPrice=20&minPrice=30&maxPrice=500&p=7',
      5,
    );
    expect(stringifiedParams).toEqual('maxPrice=500&minPrice=30&name=nameTwo&p=5');
  });
});

describe('calculateNumberOfPages()', () => {
  it('Should get correct number of pages', () => {
    expect(utility.calculateNumberOfPages(20, 10)).toEqual(2);
    expect(utility.calculateNumberOfPages(5, 2)).toEqual(3);
    expect(utility.calculateNumberOfPages(13, 4)).toEqual(4);
    expect(utility.calculateNumberOfPages(49, 25)).toEqual(2);
    expect(utility.calculateNumberOfPages(21, 20)).toEqual(2);
    expect(utility.calculateNumberOfPages(10, 10)).toEqual(1);
    expect(utility.calculateNumberOfPages(1, 10)).toEqual(1);
  });
});

describe('formatPrice()', () => {
  it('Should get correct price', () => {
    expect(utility.formatPrice(10)).toEqual('$10');
    expect(utility.formatPrice(10.1)).toEqual('$10.10');
    expect(utility.formatPrice(10.1)).toEqual('$10.10');
    expect(utility.formatPrice(5.23)).toEqual('$5.23');
    expect(utility.formatPrice(0.01)).toEqual('$0.01');
    expect(utility.formatPrice(0.9)).toEqual('$0.90');
    expect(utility.formatPrice(0.94)).toEqual('$0.94');
    expect(utility.formatPrice(111.1)).toEqual('$111.10');
    expect(utility.formatPrice(2020)).toEqual('$2,020');
    expect(utility.formatPrice(2020.2)).toEqual('$2,020.20');
    expect(utility.formatPrice(2020.2)).toEqual('$2,020.20');
    expect(utility.formatPrice(560230.7)).toEqual('$560,230.70');
    expect(utility.formatPrice(1356835.4)).toEqual('$1,356,835.40');
  });
});

describe('roundOverallPrice()', () => {
  it('Should get correct price', () => {
    expect(utility.roundOverallPrice(10)).toEqual(10);
    expect(utility.roundOverallPrice(10.1)).toEqual(10.1);
    expect(utility.roundOverallPrice(10.11)).toEqual(10.11);
    expect(utility.roundOverallPrice(10.111)).toEqual(10.12);
    expect(utility.roundOverallPrice(2190.29999)).toEqual(2190.3);
    expect(utility.roundOverallPrice(2190.21000001)).toEqual(2190.22);
    expect(utility.roundOverallPrice(0.01)).toEqual(0.01);
    expect(utility.roundOverallPrice(0.010000001)).toEqual(0.02);
    expect(utility.roundOverallPrice(0.000010000001)).toEqual(0.01);
  });
});

describe('formatOrderDate()', () => {
  it('Should get correctly formatted date', () => {
    expect(utility.formatOrderDate('2020-08-03T10:03:38.181+00:00')).toEqual('3 Aug 2020, 12:03');
    expect(utility.formatOrderDate('2021-01-31T23:03:32.217+00:00')).toEqual('1 Feb 2021, 00:03');
    expect(utility.formatOrderDate('2021-04-22T22:23:36.736+00:00')).toEqual('23 Apr 2021, 00:23');
    expect(utility.formatOrderDate('2021-02-05T21:02:07.946Z')).toEqual('5 Feb 2021, 22:02');
    expect(utility.formatOrderDate('2021-02-10T19:38:10.602Z')).toEqual('10 Feb 2021, 20:38');
    expect(utility.formatOrderDate('2021-03-09T23:01:59.016Z')).toEqual('10 Mar 2021, 00:01');
    expect(utility.formatOrderDate('2021-02-28T23:12:58.221Z')).toEqual('1 Mar 2021, 00:12');
  });
});

describe('validateURL()', () => {
  it('Should correctly validate url', () => {
    expect(utility.validateURL('http://192.168.1.109:4000/products')).toEqual(true);
    expect(utility.validateURL('https://radeon2211-eshopping.herokuapp.com/products')).toEqual(
      true,
    );
    // eslint-disable-next-line no-script-url
    expect(utility.validateURL('javascript:void(0)')).toEqual(false);
  });
});

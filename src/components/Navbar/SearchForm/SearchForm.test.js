import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import matchMediaPolyfill from 'mq-polyfill';
import SearchForm from './SearchForm';
import { defaultAppPath } from '../../../shared/constants';
import { renderAppPart } from '../../../shared/testUtility/testUtility';

const setUp = (search = '?p=1') => {
  return renderAppPart(<SearchForm />, {
    pathname: '/products',
    search,
  });
};

beforeAll(() => {
  matchMediaPolyfill(window);
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
    }).dispatchEvent(new this.Event('resize'));
  };
});

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

const mockedUseNavigateFn = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigateFn,
}));

describe('<SearchForm />', () => {
  describe('check how renders', () => {
    it('should render with text in button if width is equal or greater than 900px', () => {
      act(() => {
        window.resizeTo(900, 500);
      });
      setUp();
      expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
      expect(screen.queryByTestId('SearchForm-button-icon')).not.toBeInTheDocument();
    });

    it('should render with icon in button if width is lower than 900px', () => {
      act(() => {
        window.resizeTo(899, 500);
      });
      setUp();
      expect(screen.getByTestId('SearchForm-button-icon')).toBeInTheDocument();
    });
  });

  describe('check if correct url is pushing to history', () => {
    it('should push defaultAppPath&name=test-name if there is no name in url', () => {
      setUp();
      const input = screen.getByTestId('SearchForm-input');
      fireEvent.input(input, { target: { value: 'test-name' } });
      fireEvent.submit(input);
      expect(mockedUseNavigateFn).toHaveBeenCalledWith(`${defaultAppPath}&name=test-name`);
    });

    it('should navigate to defaultAppPath if in url is name', () => {
      setUp('?p=1&name=test-name');
      const input = screen.getByTestId('SearchForm-input');
      fireEvent.input(input, { target: { value: '' } });
      fireEvent.submit(input);
      expect(mockedUseNavigateFn).toHaveBeenCalledWith(defaultAppPath);
    });

    it('should NOT call navigate if in url is no name and input is empty', () => {
      setUp();
      const input = screen.getByTestId('SearchForm-input');
      fireEvent.submit(input);
      expect(mockedUseNavigateFn).not.toHaveBeenCalled();
    });

    it('should NOT call navigate if in url is name and input is not edited', () => {
      setUp('?p=1&name=test-name');
      const input = screen.getByTestId('SearchForm-input');
      fireEvent.submit(input);
      expect(mockedUseNavigateFn).not.toHaveBeenCalled();
    });
  });

  describe('check useEffect()', () => {
    it('should change input value after name param change', () => {
      const { rerender } = setUp('?p=1');

      const inputBefore = screen.getByTestId('SearchForm-input');
      expect(inputBefore.value).toEqual('');

      act(() => {
        rerender(
          renderAppPart(<SearchForm />, {
            pathname: '/products',
            search: '?p=1&name=test-name',
            onlyReturnWrappedElement: true,
          }),
        );
      });

      const inputAfter = screen.getByTestId('SearchForm-input');
      expect(inputAfter.value).toEqual('test-name');
    });

    it('should change input value after name param change with pollution', () => {
      const { rerender } = setUp('?p=1');

      const inputBefore = screen.getByTestId('SearchForm-input');
      expect(inputBefore.value).toEqual('');

      act(() => {
        rerender(
          renderAppPart(<SearchForm />, {
            pathname: '/products',
            search: '?p=1&name=test-name&name=other-name',
            onlyReturnWrappedElement: true,
          }),
        );
      });

      const inputAfter = screen.getByTestId('SearchForm-input');
      expect(inputAfter.value).toEqual('other-name');
    });
  });
});

import React from 'react';
import { render, cleanup, screen, fireEvent, act } from '@testing-library/react';
import matchMediaPolyfill from 'mq-polyfill';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import SearchForm from './SearchForm';
import theme from '../../../styled/theme';
import { defaultAppPath } from '../../../shared/constants';

const setUp = (push = jest.fn(), search = '?p=1') => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/products', search },
    push,
  };

  return {
    ...render(
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <SearchForm />
        </ThemeProvider>
      </Router>,
    ),
    history,
  };
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

afterEach(cleanup);

describe('<SearchForm />', () => {
  describe('Check how renders', () => {
    it('should render with text in button if width is equal or greater than 900px', () => {
      act(() => {
        window.resizeTo(900, 500);
      });
      const { asFragment } = setUp();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render with icon in button if width is lower than 900px', () => {
      act(() => {
        window.resizeTo(899, 500);
      });
      const { asFragment } = setUp();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Check if correct url is pushing to history', () => {
    it('should push defaultAppPath&name=test-name if there is no name in url', () => {
      const pushFn = jest.fn();
      setUp(pushFn);

      const input = screen.getByTestId('SearchForm-input');
      fireEvent.input(input, { target: { value: 'test-name' } });
      fireEvent.submit(input);
      expect(pushFn).toHaveBeenCalledWith(`${defaultAppPath}&name=test-name`);
    });

    it('should push defaultAppPath if in url is name', () => {
      const pushFn = jest.fn();
      setUp(pushFn, '?p=1&name=test-name');

      const input = screen.getByTestId('SearchForm-input');
      fireEvent.input(input, { target: { value: '' } });
      fireEvent.submit(input);
      expect(pushFn).toHaveBeenCalledWith(defaultAppPath);
    });

    it('should NOT call push if in url is no name and input is empty', () => {
      const pushFn = jest.fn();
      setUp(pushFn);

      const input = screen.getByTestId('SearchForm-input');
      fireEvent.submit(input);
      expect(pushFn).not.toHaveBeenCalled();
    });

    it('should NOT call push if in url is name and input is not edited', () => {
      const pushFn = jest.fn();
      setUp(pushFn, '?p=1&name=test-name');

      const input = screen.getByTestId('SearchForm-input');
      fireEvent.submit(input);
      expect(pushFn).not.toHaveBeenCalled();
    });
  });

  describe('Check useEffect()', () => {
    it('should change input value after name param change', () => {
      const pushFn = jest.fn();
      const { rerender, history } = setUp(pushFn, '?p=1');

      const inputBefore = screen.getByTestId('SearchForm-input');
      expect(inputBefore.value).toEqual('');

      const newHistory = {
        ...history,
        location: {
          ...history.location,
          search: '?p=1&name=test-name',
        },
      };

      act(() => {
        rerender(
          <Router history={newHistory}>
            <ThemeProvider theme={theme}>
              <SearchForm />
            </ThemeProvider>
          </Router>,
        );
      });

      const inputAfter = screen.getByTestId('SearchForm-input');
      expect(inputAfter.value).toEqual('test-name');
    });

    it('should change input value after name param change with pollution', () => {
      const pushFn = jest.fn();
      const { rerender, history } = setUp(pushFn, '?p=1');

      const inputBefore = screen.getByTestId('SearchForm-input');
      expect(inputBefore.value).toEqual('');

      const newHistory = {
        ...history,
        location: {
          ...history.location,
          search: '?p=1&name=test-name&name=other-name',
        },
      };

      act(() => {
        rerender(
          <Router history={newHistory}>
            <ThemeProvider theme={theme}>
              <SearchForm />
            </ThemeProvider>
          </Router>,
        );
      });

      const inputAfter = screen.getByTestId('SearchForm-input');
      expect(inputAfter.value).toEqual('other-name');
    });
  });
});

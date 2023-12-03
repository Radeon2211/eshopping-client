import React from 'react';
import { render, cleanup, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import matchMediaPolyfill from 'mq-polyfill';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import SearchForm from './SearchForm';
import theme from '../../../styled/theme';
import { defaultAppPath } from '../../../shared/constants';

const setUp = (search = '?p=1') => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/products', search },
    push: jest.fn(),
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
      const { history } = setUp();
      const input = screen.getByTestId('SearchForm-input');
      fireEvent.input(input, { target: { value: 'test-name' } });
      fireEvent.submit(input);
      expect(history.push).toHaveBeenCalledWith(`${defaultAppPath}&name=test-name`);
    });

    it('should push defaultAppPath if in url is name', () => {
      const { history } = setUp('?p=1&name=test-name');

      const input = screen.getByTestId('SearchForm-input');
      fireEvent.input(input, { target: { value: '' } });
      fireEvent.submit(input);
      expect(history.push).toHaveBeenCalledWith(defaultAppPath);
    });

    it('should NOT call push if in url is no name and input is empty', () => {
      const { history } = setUp();

      const input = screen.getByTestId('SearchForm-input');
      fireEvent.submit(input);
      expect(history.push).not.toHaveBeenCalled();
    });

    it('should NOT call push if in url is name and input is not edited', () => {
      const { history } = setUp('?p=1&name=test-name');
      const input = screen.getByTestId('SearchForm-input');
      fireEvent.submit(input);
      expect(history.push).not.toHaveBeenCalled();
    });
  });

  describe('check useEffect()', () => {
    it('should change input value after name param change', () => {
      const { rerender, history } = setUp('?p=1');

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
      const { rerender, history } = setUp('?p=1');

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

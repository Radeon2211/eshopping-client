import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import ErrorPage from './ErrorPage';
import { checkProps } from '../../../shared/testUtility/testUtility';
import { ReactComponent as UnexpectedBugImage } from '../../../images/unexpected-bug.svg';
import { ReactComponent as ServerErrorImage } from '../../../images/server-connection-error.svg';

const setUp = (children, info) => {
  return render(
    <ThemeProvider theme={theme}>
      <ErrorPage info={info}>{children}</ErrorPage>
    </ThemeProvider>,
  );
};

afterEach(cleanup);

describe('<ErrorPage />', () => {
  describe('Check prop types', () => {
    it('should NOT throw a warning', () => {
      expect(checkProps(ErrorPage, { children: <div /> })).toBeUndefined();
    });

    it('should throw a warning', () => {
      expect(checkProps(ErrorPage, {})).not.toBe(null);
    });
  });

  it('should render "Something went wrong" and unexpected bug image', () => {
    const { asFragment } = setUp(<UnexpectedBugImage />, 'Something went wrong');
    expect(asFragment()).toMatchSnapshot();
  });

  it('should NOT render info and should render server error image image', () => {
    const { asFragment } = setUp(<ServerErrorImage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

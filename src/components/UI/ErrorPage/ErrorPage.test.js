import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import ErrorPage from './ErrorPage';
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
  it('should render "Something went wrong" and unexpected bug image', () => {
    setUp(<UnexpectedBugImage />, 'Something went wrong');
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('unexpected-bug.svg')).toBeInTheDocument();
  });

  it('should NOT render info and should render server error image image', () => {
    setUp(<ServerErrorImage />);
    expect(screen.getByText('server-connection-error.svg')).toBeInTheDocument();
  });
});

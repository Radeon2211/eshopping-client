import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from './Loader';
import { renderAppPart } from '../../../shared/testUtility/testUtility';

const setUp = (align = '') => {
  return renderAppPart(<Loader align={align} />, {
    withoutRouter: true,
  });
};

describe('<Loader />', () => {
  it('should render with wrapper', () => {
    setUp('center');
    expect(screen.getByTestId('LoaderWrapper'));
    expect(screen.getByTestId('Loader'));
  });

  it('should render without wrapper', () => {
    setUp();
    expect(screen.queryByTestId('LoaderWrapper')).not.toBeInTheDocument();
    expect(screen.getByTestId('Loader'));
  });
});

import { screen } from '@testing-library/react';
import ErrorPage, { ErrorPageProps } from './ErrorPage';
import { ReactComponent as UnexpectedBugImage } from '../../../images/unexpected-bug.svg';
import { ReactComponent as ServerErrorImage } from '../../../images/server-connection-error.svg';
import { renderAppPart } from '../../../shared/testUtility/testUtility';

const setUp = ({ icon, info }: ErrorPageProps) => {
  return renderAppPart(<ErrorPage info={info} icon={icon} />, {
    withoutRouter: true,
  });
};

describe('<ErrorPage />', () => {
  it('should render "Something went wrong" and unexpected bug image', () => {
    setUp({ icon: <UnexpectedBugImage />, info: 'Something went wrong' });
    expect(screen.getByText('Something went wrong'));
    expect(screen.getByText('unexpected-bug.svg'));
  });

  it('should NOT render info and should render server error image image', () => {
    setUp({ icon: <ServerErrorImage /> });
    expect(screen.getByText('server-connection-error.svg'));
  });
});

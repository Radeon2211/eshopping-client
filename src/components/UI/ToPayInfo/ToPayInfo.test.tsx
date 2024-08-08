import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToPayInfo from './ToPayInfo';
import { renderAppPart } from '../../../shared/testUtility/testUtility';

const setUp = (value: number) => {
  return renderAppPart(<ToPayInfo value={value} />, {
    withoutRouter: true,
  });
};

describe('<ToPayInfo />', () => {
  it('should render everything correctly', () => {
    setUp(1195.2);
    expect(screen.getByTestId('ToPayInfo')).toHaveTextContent('To pay');
    expect(screen.getByTestId('ToPayInfo')).toHaveTextContent('$1,195.20');
  });
});

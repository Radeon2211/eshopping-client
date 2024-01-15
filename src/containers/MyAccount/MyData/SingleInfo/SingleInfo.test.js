import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import SingleInfo from './SingleInfo';
import { singleInfoNames } from '../../../../shared/constants';
import { renderAppPart } from '../../../../shared/testUtility/testUtility';

const setUp = (name, content, clickHandler) => {
  return renderAppPart(<SingleInfo name={name} content={content} clickHandler={clickHandler} />, {
    withoutRouter: true,
  });
};

describe('<SingleInfo />', () => {
  describe('check how renders', () => {
    it('should render correctly for name and with button', () => {
      const { asFragment } = setUp(singleInfoNames.NAME, 'Ludwig von Mises', jest.fn());
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly for address and with button', () => {
      const address = ['Street 1', '00-000 City', 'Poland'];
      const { asFragment } = setUp(singleInfoNames.ADDRESS, address, jest.fn());
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly for contacts (both visible) and with button', () => {
      const { asFragment } = setUp(
        singleInfoNames.CONTACTS,
        { email: true, phone: true },
        jest.fn(),
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly for contacts (both hidden) and without button', () => {
      const { asFragment } = setUp(singleInfoNames.CONTACTS, { email: false, phone: false });
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('should call clickHandler after clicking on button', () => {
    const clickHandler = jest.fn();
    setUp(singleInfoNames.NAME, 'Ludwig von Mises', clickHandler);

    fireEvent.click(screen.getByRole('button', { name: /change/i }));
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});

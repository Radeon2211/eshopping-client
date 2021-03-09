import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import SingleInfo from './SingleInfo';
import { checkProps } from '../../../../shared/testUtility';
import { singleInfoNames } from '../../../../shared/constants';
import theme from '../../../../styled/theme';

const setUp = (name, content, clickHandler) => {
  return render(
    <ThemeProvider theme={theme}>
      <SingleInfo name={name} content={content} clickHandler={clickHandler} />
    </ThemeProvider>,
  );
};

afterEach(cleanup);

describe('<SingleInfo />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      const props = {
        name: singleInfoNames.NAME,
        content: 'test name',
        clickHandler: jest.fn(),
      };
      expect(checkProps(SingleInfo, props)).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(SingleInfo, {})).not.toBe(null);
    });
  });

  describe('Check how renders', () => {
    it('Should render correctly for name and with button', () => {
      const { asFragment } = setUp(singleInfoNames.NAME, 'Ludwig von Mises', jest.fn());
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render correctly for address and with button', () => {
      const address = ['Street 1', '00-000 City', 'Poland'];
      const { asFragment } = setUp(singleInfoNames.ADDRESS, address, jest.fn());
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render correctly for contacts (both visible) and with button', () => {
      const { asFragment } = setUp(
        singleInfoNames.CONTACTS,
        { email: true, phone: true },
        jest.fn(),
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render correctly for contacts (both hidden) and without button', () => {
      const { asFragment } = setUp(singleInfoNames.CONTACTS, { email: false, phone: false });
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('Should call clickHandler after clicking on button', () => {
    const clickHandler = jest.fn();
    setUp(singleInfoNames.NAME, 'Ludwig von Mises', clickHandler);

    fireEvent.click(screen.getByText('Change'));
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});

/* eslint-disable import/no-extraneous-dependencies */
import Enzyme from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'jest-styled-components';
import { createSerializer } from 'enzyme-to-json';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

global.IntersectionObserver = class IntersectionObserver {
  observe() {
    return this;
  }
};

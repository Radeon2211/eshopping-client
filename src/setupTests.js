/* eslint-disable import/no-extraneous-dependencies */
import 'jest-styled-components';

global.IntersectionObserver = class IntersectionObserver {
  observe() {
    return this;
  }
};

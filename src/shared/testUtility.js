// eslint-disable-next-line import/no-extraneous-dependencies
import checkPropTypes from 'check-prop-types';

export const checkProps = (component, expectedProps) => {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  return checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
};

export const historyPageNum = (pageNumber) => ({
  listen: jest.fn(),
  location: { search: `?p=${pageNumber}` },
  createHref: jest.fn(),
  push: jest.fn(),
});

export const propsPagination = (itemQuantity = 5) => ({
  itemQuantity,
  isDataLoading: false,
  maxQuantityPerPage: 2,
});

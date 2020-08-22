import queryString from 'query-string';
import axios from '../../axios';
import * as actionTypes from './actionTypes';
import * as uiActions from './uiActions';
import { getErrorMessage } from '../../shared/utility';
import { MAX_QUANTITY_PER_PAGE } from '../../shared/constants';

export const setProducts = (products, productCount, minPrice, maxPrice) => ({
  type: actionTypes.SET_PRODUCTS,
  products,
  productCount,
  minPrice,
  maxPrice,
});

export const addNewProduct = (product) => ({
  type: actionTypes.ADD_PRODUCT,
  product,
});

export const addProduct = (product, currentPath) => {
  return async (dispatch) => {
    dispatch(uiActions.formStart());
    const correctProduct = {
      ...product,
      photo: undefined,
    };
    try {
      let addedProduct = null;
      const { data: firstData } = await axios.post('/products', correctProduct);
      addedProduct = firstData.product;
      if (product.photo) {
        const formData = new FormData();
        formData.append('photo', product.photo);
        const { data: secondData } = await axios.post(
          `/products/${firstData.product._id}/photo`,
          formData,
        );
        addedProduct = secondData.product;
      }
      if (currentPath.startsWith('/my-account/products')) {
        dispatch(addNewProduct(addedProduct));
      }
      dispatch(uiActions.formSuccess());
      dispatch(uiActions.setMessage('Product was added successfully'));
      setTimeout(() => {
        dispatch(uiActions.deleteMessage());
      }, 5000);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const fetchProducts = (queryStrings) => {
  return async (dispatch, getState) => {
    dispatch(uiActions.listStart());
    let minPriceOuter = 0;
    let maxPriceOuter = 0;
    const parsedQueryParams = queryString.parse(queryStrings);
    const { seller, p: page } = parsedQueryParams;
    const { maxQuantityPerPage } = getState().ui;
    parsedQueryParams.limit = maxQuantityPerPage;
    if (seller !== undefined) {
      delete parsedQueryParams.seller;
    }
    if (page) {
      const currentProductQuantity = getState().product.productCount;
      if (page > Math.ceil(currentProductQuantity / maxQuantityPerPage) || page < 1) {
        delete parsedQueryParams.p;
      }
    }
    const updatedQueryParams = queryString.stringify(parsedQueryParams);
    try {
      const { data } = await axios.get(`/products?${updatedQueryParams}`);
      if (data.productPrices.length > 0) {
        const { minPrice, maxPrice } = data.productPrices[0];
        minPriceOuter = minPrice;
        maxPriceOuter = maxPrice;
      }
      dispatch(setProducts(data.products, data.productCount, minPriceOuter, maxPriceOuter));
      dispatch(uiActions.listSuccess());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.listFail(errorMessage));
    }
  };
};

import queryString from 'query-string';
import axios from '../../axios';
import * as actionTypes from './actionTypes';
import * as uiActions from './uiActions';
import { getErrorMessage } from '../../shared/utility';

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

export const setProductDetails = (productDetails) => ({
  type: actionTypes.SET_PRODUCT_DETAILS,
  productDetails,
});

export const deleteProductDetails = () => ({
  type: actionTypes.DELETE_PRODUCT_DETAILS,
});

export const deleteProductFromList = (productId) => ({
  type: actionTypes.DELETE_PRODUCT_FROM_LIST,
  productId,
});

export const clearProducts = () => ({
  type: actionTypes.CLEAR_PRODUCTS,
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
      dispatch(uiActions.setMessage('Product has been added successfully'));
      setTimeout(() => {
        dispatch(uiActions.deleteMessage());
      }, 5000);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const fetchProducts = (queryStrings, page, sellerId) => {
  return async (dispatch, getState) => {
    dispatch(uiActions.dataStart());
    let minPriceOuter = 0;
    let maxPriceOuter = 0;

    const parsedQueryParams = queryString.parse(queryStrings);
    const { seller, p: pageNumber } = parsedQueryParams;

    const { maxQuantityPerPage } = getState().ui;
    parsedQueryParams.limit = maxQuantityPerPage;

    if (seller) {
      delete parsedQueryParams.seller;
    }
    if (pageNumber) {
      const currentProductQuantity = getState().product.productCount;
      if (pageNumber > Math.ceil(currentProductQuantity / maxQuantityPerPage) || pageNumber < 1) {
        delete parsedQueryParams.p;
      }
    }

    parsedQueryParams.page = page;
    if (sellerId) {
      parsedQueryParams.seller = sellerId;
    }

    const updatedQueryParams = queryString.stringify(parsedQueryParams);

    try {
      const { data } = await axios.get(`/products?${updatedQueryParams}`);
      if (data.productPrices.length > 0) {
        const { minPrice, maxPrice } = data.productPrices[0];
        minPriceOuter = minPrice;
        maxPriceOuter = maxPrice;
      }
      dispatch(uiActions.dataSuccess());
      dispatch(setProducts(data.products, data.productCount, minPriceOuter, maxPriceOuter));
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.dataFail(errorMessage));
    }
  };
};

export const fetchProductDetails = (productId) => {
  return async (dispatch) => {
    dispatch(uiActions.dataStart());
    try {
      const { data } = await axios.get(`/products/${productId}`);
      dispatch(uiActions.dataSuccess());
      dispatch(setProductDetails(data));
    } catch (error) {
      if (error?.response?.data?.kind === 'ObjectId') {
        dispatch(uiActions.dataFail('Product ID given in URL is not correct'));
      } else {
        const errorMessage = getErrorMessage(error);
        dispatch(uiActions.dataFail(errorMessage));
      }
      dispatch(setProductDetails(null));
    }
  };
};

export const deleteProduct = (productId, history) => {
  return async (dispatch) => {
    dispatch(uiActions.formStart());
    try {
      await axios.delete(`products/${productId}`);
      dispatch(deleteProductDetails());
      dispatch(deleteProductFromList(productId));
      dispatch(uiActions.formSuccess());
      dispatch(uiActions.setMessage('Product has been deleted succesfully'));
      setTimeout(() => {
        dispatch(uiActions.deleteMessage());
      }, 5000);
      history.goBack();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

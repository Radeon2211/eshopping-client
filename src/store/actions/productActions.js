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
      const { data } = await axios.post('/products', correctProduct);
      if (product.photo) {
        const formData = new FormData();
        formData.append('photo', product.photo);
        await axios.post(`/products/${data.product._id}/photo`, formData);
      }
      dispatch(uiActions.formSuccess());
      if (currentPath.startsWith('/my-account/products')) {
        dispatch(
          uiActions.setAndDeleteMessage(
            'Product has been added successfully. Refresh page to see it.',
          ),
        );
      } else {
        dispatch(uiActions.setAndDeleteMessage('Product has been added successfully'));
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const editProduct = (productData, productId) => {
  return async (dispatch) => {
    dispatch(uiActions.formStart());
    const correctProduct = {
      ...productData,
      photo: undefined,
    };
    try {
      let editedProduct = null;
      const { data: firstData } = await axios.patch(
        `/products/${productId}/seller`,
        correctProduct,
      );
      editedProduct = firstData.product;
      if (productData.photo) {
        if (productData.photo === 'DELETED') {
          await axios.delete(`/products/${firstData.product._id}/photo`);
          editedProduct.photo = undefined;
        } else {
          const formData = new FormData();
          formData.append('photo', productData.photo);
          const { data: secondData } = await axios.post(
            `/products/${firstData.product._id}/photo`,
            formData,
          );
          editedProduct = secondData.product;
        }
      }
      dispatch(
        setProductDetails({
          ...editedProduct,
          photo: undefined,
        }),
      );
      dispatch(setProductDetails(editedProduct));
      dispatch(uiActions.setAndDeleteMessage('Product has been edited successfully'));
      dispatch(uiActions.formSuccess());
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
      dispatch(setProductDetails(data.product));
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
      dispatch(uiActions.setAndDeleteMessage('Product has been deleted successfully'));
      history.goBack();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

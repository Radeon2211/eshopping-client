import queryString from 'query-string';
import axios from '../../axios';
import * as actionTypes from './actionTypes';
import * as uiActions from './uiActions';
import { getErrorMessage } from '../../shared/utility';

export const setProducts = (
  products = undefined,
  productCount = undefined,
  minPrice = 0,
  maxPrice = 0,
) => ({
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

export const deleteProductFromList = (productId) => ({
  type: actionTypes.DELETE_PRODUCT_FROM_LIST,
  productId,
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
        await axios.post(`/products/${data.productId}/photo`, formData);
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
      const { data: firstData } = await axios.patch(`/products/${productId}`, correctProduct);
      editedProduct = firstData.product;
      if (productData.photo) {
        if (productData.photo === 'DELETED') {
          await axios.delete(`/products/${firstData.product._id}/photo`);
          editedProduct.photo = false;
        } else {
          const formData = new FormData();
          formData.append('photo', productData.photo);
          await axios.post(`/products/${firstData.product._id}/photo`, formData);
          editedProduct.photo = true;
        }
      }
      dispatch(
        setProductDetails({
          ...editedProduct,
          photo: false,
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

export const fetchProducts = (queryStrings, page, sellerUsername) => {
  return async (dispatch, getState) => {
    dispatch(uiActions.dataStart());
    let minPriceOuter = 0;
    let maxPriceOuter = 0;

    const parsedQueryParams = queryString.parse(queryStrings);
    const { seller, p: pageNumber } = parsedQueryParams;

    const { productsPerPage } = getState().ui;
    parsedQueryParams.limit = productsPerPage;

    if (seller) {
      delete parsedQueryParams.seller;
    }
    if (pageNumber) {
      const currentProductQuantity = getState().product.productCount;
      if (pageNumber > Math.ceil(currentProductQuantity / productsPerPage) || pageNumber < 1) {
        delete parsedQueryParams.p;
      }
    }

    parsedQueryParams.page = page;
    if (sellerUsername) {
      parsedQueryParams.seller = sellerUsername;
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
      dispatch(uiActions.dataEnd());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(uiActions.dataEnd());
      dispatch(setProducts(null));
    }
  };
};

export const fetchProductDetails = (productId) => {
  return async (dispatch) => {
    dispatch(uiActions.dataStart());
    try {
      const { data } = await axios.get(`/products/${productId}`);
      dispatch(setProductDetails(data.product));
      dispatch(uiActions.dataEnd());
    } catch (error) {
      dispatch(setProductDetails(null));
      if (error?.response?.data?.kind === 'ObjectId') {
        dispatch(uiActions.setAndDeleteMessage('Product ID given in URL is not correct'));
        dispatch(uiActions.dataEnd());
      } else {
        const errorMessage = getErrorMessage(error);
        dispatch(uiActions.setAndDeleteMessage(errorMessage));
        dispatch(uiActions.dataEnd());
      }
    }
  };
};

export const deleteProduct = (productId, history) => {
  return async (dispatch) => {
    dispatch(uiActions.formStart());
    try {
      await axios.delete(`products/${productId}`);
      dispatch(setProductDetails(undefined));
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

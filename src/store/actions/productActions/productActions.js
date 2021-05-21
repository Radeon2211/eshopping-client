import queryString from 'query-string';
import axios from '../../../axios';
import * as actionTypes from '../actionTypes';
import * as uiActions from '../uiActions/uiActions';
import { getErrorMessage, getParamsWithoutPollution } from '../../../shared/utility/utility';
import { productPhotoFieldValues } from '../../../shared/constants';

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

export const addProduct = (productData, currentPath) => {
  return async (dispatch) => {
    let newProductId;
    try {
      dispatch(uiActions.formStart());

      const correctProduct = {
        ...productData,
        photo: undefined,
      };

      const { data } = await axios.post('/products', correctProduct);
      newProductId = data.productId;
      if (productData.photo) {
        const formData = new FormData();
        formData.append('photo', productData.photo);
        await axios.post(`/products/${newProductId}/photo`, formData);
      }

      if (currentPath.startsWith('/my-account/products')) {
        dispatch(
          uiActions.setAndDeleteMessage(
            'Product has been added successfully. Refresh page to see it',
          ),
        );
      } else {
        dispatch(uiActions.setAndDeleteMessage('Product has been added successfully'));
      }
      dispatch(uiActions.formSuccess());
    } catch (error) {
      if (newProductId) {
        try {
          await axios.delete(`/products/${newProductId}`);
          const errorMessage = getErrorMessage(error);
          dispatch(uiActions.formFail(errorMessage));
        } catch (err) {
          dispatch(
            uiActions.formFail(
              'Product has been added, but problem occured during uploading photo',
            ),
          );
        }
      } else {
        const errorMessage = getErrorMessage(error);
        dispatch(uiActions.formFail(errorMessage));
      }
    }
  };
};

export const editProduct = (productData, productId) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.formStart());

      const correctProduct = {
        ...productData,
        photo: undefined,
      };

      let editedProduct = null;
      const { data } = await axios.patch(`/products/${productId}`, correctProduct);
      editedProduct = data.product;

      if (productData.photo) {
        if (productData.photo === productPhotoFieldValues.DELETED) {
          await axios.delete(`/products/${data.product._id}/photo`);
          editedProduct.photo = false;
        } else {
          const formData = new FormData();
          formData.append('photo', productData.photo);
          await axios.post(`/products/${data.product._id}/photo`, formData);
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

export const fetchProducts = (search, page, sellerUsername) => {
  return async (dispatch, getState) => {
    try {
      dispatch(uiActions.dataStart());

      let minPriceOuter = 0;
      let maxPriceOuter = 0;

      const parsedQueryParams = getParamsWithoutPollution(search);
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
      dispatch(setProducts(null));
      dispatch(uiActions.dataEnd());
    }
  };
};

export const fetchProductDetails = (productId) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.dataStart());
      const { data } = await axios.get(`/products/${productId}`);
      dispatch(setProductDetails(data.product));
      dispatch(uiActions.dataEnd());
    } catch (error) {
      if (error?.response?.data?.kind === 'ObjectId') {
        dispatch(uiActions.setAndDeleteMessage('Product ID given in URL is not correct'));
      } else {
        const errorMessage = getErrorMessage(error);
        dispatch(uiActions.setAndDeleteMessage(errorMessage));
      }
      dispatch(setProductDetails(null));
      dispatch(uiActions.dataEnd());
    }
  };
};

export const deleteProduct = (productId, history) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.formStart());
      await axios.delete(`/products/${productId}`);
      dispatch(setProductDetails(undefined));
      dispatch(deleteProductFromList(productId));
      dispatch(uiActions.setAndDeleteMessage('Product has been deleted successfully'));
      dispatch(uiActions.formSuccess());
      history.goBack();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

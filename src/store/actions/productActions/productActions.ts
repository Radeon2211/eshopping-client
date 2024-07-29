import queryString from 'query-string';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { NavigateFunction } from 'react-router-dom';
import axios from '../../../axios';
import * as uiActions from '../uiActions/uiActions';
import { getErrorMessage, getParamsWithoutPollution } from '../../../shared/utility/utility';
import { ProductAction } from './productActionTypes';
import { AxiosErrorType, Product, RootState } from '../../../shared/types/types';
import { ProductReducerState } from '../../reducers/productReducer/productReducer';
import { ProductPhotoFieldValue } from '../../../shared/types/enums';
import { AddProductForm } from '../../../shared/types/forms';
import { UiReducerState } from '../../reducers/uiReducer/uiReducer';

type DispatchExts = ThunkDispatch<ProductReducerState & UiReducerState, void, AnyAction>;

export const setProducts = (
  products: Product[] | null | undefined = undefined,
  productCount = undefined,
  minPrice = 0,
  maxPrice = 0,
) => ({
  type: ProductAction.SET_PRODUCTS,
  products,
  productCount,
  minPrice,
  maxPrice,
});

export const setProductDetails = (productDetails: Product | null | undefined) => ({
  type: ProductAction.SET_PRODUCT_DETAILS,
  productDetails,
});

export const deleteProductFromList = (productId: string) => ({
  type: ProductAction.DELETE_PRODUCT_FROM_LIST,
  productId,
});

export const addProduct = (productData: AddProductForm, currentPath: string) => {
  return async (dispatch: DispatchExts) => {
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
          const errorMessage = getErrorMessage(error as AxiosErrorType);
          dispatch(uiActions.formFail(errorMessage));
        } catch (err) {
          dispatch(
            uiActions.formFail(
              'Product has been added, but problem occured during uploading photo',
            ),
          );
        }
      } else {
        const errorMessage = getErrorMessage(error as AxiosErrorType);
        dispatch(uiActions.formFail(errorMessage));
      }
    }
  };
};

export const editProduct = (productData: AddProductForm, productId: string) => {
  return async (dispatch: DispatchExts) => {
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
        if (productData.photo === ProductPhotoFieldValue.DELETED) {
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
      const errorMessage = getErrorMessage(error as AxiosErrorType);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const fetchProducts = (search: string, page: number, sellerUsername: string) => {
  return async (dispatch: DispatchExts, getState: () => RootState) => {
    try {
      dispatch(uiActions.dataStart());

      let minPriceOuter = 0;
      let maxPriceOuter = 0;

      const parsedQueryParams = getParamsWithoutPollution(search);
      const { seller, p: pageNumber } = parsedQueryParams;

      const { productsPerPage } = getState().ui;
      parsedQueryParams.limit = productsPerPage.toString();

      if (seller) {
        delete parsedQueryParams.seller;
      }
      if (pageNumber) {
        const currentProductQuantity = getState().product.productCount;
        if (
          (currentProductQuantity &&
            +pageNumber > Math.ceil(currentProductQuantity / productsPerPage)) ||
          +pageNumber < 1
        ) {
          delete parsedQueryParams.p;
        }
      }

      parsedQueryParams.page = page.toString();
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
      const errorMessage = getErrorMessage(error as AxiosErrorType);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(setProducts(null));
      dispatch(uiActions.dataEnd());
    }
  };
};

export const fetchProductDetails = (productId: string) => {
  return async (dispatch: DispatchExts) => {
    try {
      dispatch(uiActions.dataStart());
      const { data } = await axios.get(`/products/${productId}`);
      dispatch(setProductDetails(data.product));
      dispatch(uiActions.dataEnd());
    } catch (error) {
      const data = (error as AxiosErrorType).response?.data;
      if (data && 'kind' in data && data.kind === 'ObjectId') {
        dispatch(uiActions.setAndDeleteMessage('Product ID given in URL is not correct'));
      } else {
        const errorMessage = getErrorMessage(error as AxiosErrorType);
        dispatch(uiActions.setAndDeleteMessage(errorMessage));
      }
      dispatch(setProductDetails(null));
      dispatch(uiActions.dataEnd());
    }
  };
};

export const deleteProduct = (productId: string, navigateFn: NavigateFunction) => {
  return async (dispatch: DispatchExts) => {
    try {
      dispatch(uiActions.formStart());
      await axios.delete(`/products/${productId}`);
      dispatch(setProductDetails(undefined));
      dispatch(deleteProductFromList(productId));
      dispatch(uiActions.setAndDeleteMessage('Product has been deleted successfully'));
      dispatch(uiActions.formSuccess());
      navigateFn(-1);
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosErrorType);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

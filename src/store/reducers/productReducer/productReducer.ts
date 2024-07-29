import { updateObject } from '../../../shared/utility/utility';
import { Product } from '../../../shared/types/types';
import { ProductAction } from '../../actions/productActions/productActionTypes';

export interface ProductReducerState {
  products?: Product[];
  productCount?: number;
  productDetails?: Product;
  minPrice: number;
  maxPrice: number;
}

export const initialProductReducerState: ProductReducerState = {
  products: undefined,
  productCount: undefined,
  productDetails: undefined,
  minPrice: 0,
  maxPrice: 0,
};

type SetProductsAction = {
  type: ProductAction.SET_PRODUCTS;
  products: Product[];
  productCount: number;
  minPrice: number;
  maxPrice: number;
};
const setProducts = (state: ProductReducerState, action: SetProductsAction) => {
  return updateObject(state, {
    products: action.products,
    productCount: action.productCount,
    minPrice: action.minPrice,
    maxPrice: action.maxPrice,
  });
};

type SetProductDetailsAction = {
  type: ProductAction.SET_PRODUCT_DETAILS;
  productDetails: Product;
};
const setProductDetails = (state: ProductReducerState, action: SetProductDetailsAction) => {
  return updateObject(state, { productDetails: action.productDetails });
};

type DeleteProductFromListAction = {
  type: ProductAction.DELETE_PRODUCT_FROM_LIST;
  productId: string;
};
const deleteProductFromList = (state: ProductReducerState, action: DeleteProductFromListAction) => {
  if (!state.products) return state;
  const updatedProducts = state.products.filter(({ _id }) => _id !== action.productId);
  return updateObject(state, { products: updatedProducts });
};

export type ProductReducerAction =
  | SetProductsAction
  | SetProductDetailsAction
  | DeleteProductFromListAction;
// eslint-disable-next-line default-param-last
const productReducer = (state = initialProductReducerState, action: ProductReducerAction) => {
  switch (action.type) {
    case ProductAction.SET_PRODUCTS:
      return setProducts(state, action);
    case ProductAction.SET_PRODUCT_DETAILS:
      return setProductDetails(state, action);
    case ProductAction.DELETE_PRODUCT_FROM_LIST:
      return deleteProductFromList(state, action);
    default:
      return state;
  }
};

export default productReducer;

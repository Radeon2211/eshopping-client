import queryString from 'query-string';
import axios from '../../../axios';
import * as uiActions from '../uiActions/uiActions';
import { getErrorMessage, getParamsWithoutPollution } from '../../../shared/utility/utility';
import { AuthAction } from '../authActions/authActionTypes';
import { AxiosErrorType, Order, OrderType } from '../../../shared/types/types';
import { TypedThunkAction } from '../../reducers/rootReducer';

export const setPlacedOrders = (placedOrders: Order[] | null, orderCount?: number) => ({
  type: AuthAction.SET_PLACED_ORDERS,
  placedOrders,
  orderCount,
});

export const setSellHistory = (sellHistory: Order[] | null, orderCount?: number) => ({
  type: AuthAction.SET_SELL_HISTORY,
  sellHistory,
  orderCount,
});

export const setOrderDetails = (orderDetails: Order | null) => ({
  type: AuthAction.SET_ORDER_DETAILS,
  orderDetails,
});

export const fetchOrders = (search: string, orderType: OrderType): TypedThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.dataStart());

      const parsedQueryParams = getParamsWithoutPollution(search);
      const { p: pageNumber } = parsedQueryParams;
      if (!pageNumber || +pageNumber < 1) parsedQueryParams.p = '1';
      const updatedQueryParams = queryString.stringify(parsedQueryParams);

      const {
        data: { orders, orderCount },
      } = await axios.get(`/orders?type=${orderType}&${updatedQueryParams}`);

      if (orderType === OrderType.PLACED_ORDERS) {
        dispatch(setPlacedOrders(orders, orderCount));
      } else {
        dispatch(setSellHistory(orders, orderCount));
      }

      dispatch(uiActions.dataEnd());
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosErrorType);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      if (orderType === OrderType.PLACED_ORDERS) {
        dispatch(setPlacedOrders(null));
      } else {
        dispatch(setSellHistory(null));
      }
      dispatch(uiActions.dataEnd());
    }
  };
};

export const fetchOrderDetails = (orderId: string): TypedThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.dataStart());
      const { data } = await axios.get(`/orders/${orderId}`);
      dispatch(setOrderDetails(data.order));
      dispatch(uiActions.dataEnd());
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosErrorType);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(setOrderDetails(null));
      dispatch(uiActions.dataEnd());
    }
  };
};

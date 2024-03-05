import queryString from 'query-string';
import axios from '../../../axios';
import * as uiActions from '../uiActions/uiActions';
import { orderTypes } from '../../../shared/constants';
import { getErrorMessage, getParamsWithoutPollution } from '../../../shared/utility/utility';
import { AuthAction } from '../authActions/authActionTypes';

export const setPlacedOrders = (placedOrders, orderCount = undefined) => ({
  type: AuthAction.SET_PLACED_ORDERS,
  placedOrders,
  orderCount,
});

export const setSellHistory = (sellHistory, orderCount = undefined) => ({
  type: AuthAction.SET_SELL_HISTORY,
  sellHistory,
  orderCount,
});

export const setOrderDetails = (orderDetails) => ({
  type: AuthAction.SET_ORDER_DETAILS,
  orderDetails,
});

export const fetchOrders = (search, orderType) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.dataStart());

      const parsedQueryParams = getParamsWithoutPollution(search);
      const { p: pageNumber } = parsedQueryParams;
      if (!pageNumber || pageNumber < 1) parsedQueryParams.p = 1;
      const updatedQueryParams = queryString.stringify(parsedQueryParams);

      const {
        data: { orders, orderCount },
      } = await axios.get(`/orders?type=${orderType}&${updatedQueryParams}`);

      if (orderType === orderTypes.PLACED_ORDERS) {
        dispatch(setPlacedOrders(orders, orderCount));
      } else {
        dispatch(setSellHistory(orders, orderCount));
      }

      dispatch(uiActions.dataEnd());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      if (orderType === orderTypes.PLACED_ORDERS) {
        dispatch(setPlacedOrders(null, undefined));
      } else {
        dispatch(setSellHistory(null, undefined));
      }
      dispatch(uiActions.dataEnd());
    }
  };
};

export const fetchOrderDetails = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.dataStart());
      const { data } = await axios.get(`/orders/${orderId}`);
      dispatch(setOrderDetails(data.order));
      dispatch(uiActions.dataEnd());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(setOrderDetails(null));
      dispatch(uiActions.dataEnd());
    }
  };
};

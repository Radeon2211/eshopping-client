import queryString from 'query-string';
import axios from '../../axios';
import * as actionTypes from './actionTypes';
import * as uiActions from './uiActions';
import { orderTypes } from '../../shared/constants';
import { getErrorMessage, getParamsWithoutPollution } from '../../shared/utility/utility';

export const setPlacedOrders = (placedOrders, orderCount = undefined) => ({
  type: actionTypes.SET_PLACED_ORDERS,
  placedOrders,
  orderCount,
});

export const setSellHistory = (sellHistory, orderCount = undefined) => ({
  type: actionTypes.SET_SELL_HISTORY,
  sellHistory,
  orderCount,
});

export const setOrderDetails = (orderDetails) => ({
  type: actionTypes.SET_ORDER_DETAILS,
  orderDetails,
});

export const fetchOrders = (search, type) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.dataStart());
      const parsedQueryParams = getParamsWithoutPollution(search);
      const { p: pageNumber } = parsedQueryParams;

      if (!pageNumber || pageNumber < 1) parsedQueryParams.p = 1;

      const updatedQueryParams = queryString.stringify(parsedQueryParams);

      const {
        data: { orders, orderCount },
      } = await axios.get(`/orders?type=${type}&${updatedQueryParams}`);

      if (type === orderTypes.PLACED_ORDERS) {
        dispatch(setPlacedOrders(orders, orderCount));
      } else {
        dispatch(setSellHistory(orders, orderCount));
      }

      dispatch(uiActions.dataEnd());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(setPlacedOrders(null, undefined));
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

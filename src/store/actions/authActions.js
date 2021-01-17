import axios from '../../axios';
import * as actionTypes from './actionTypes';
import * as uiActions from './uiActions';
import { getErrorMessage } from '../../shared/utility';
import { DEFAULT_PATH } from '../../shared/constants';

export const setProfile = (profile) => ({
  type: actionTypes.SET_PROFILE,
  profile,
});

export const logout = () => ({
  type: actionTypes.LOGOUT_USER,
});

export const setDeliveryAddress = (deliveryAddress) => ({
  type: actionTypes.SET_DELIVERY_ADDRESS,
  deliveryAddress,
});

export const setOtherUser = (user) => ({
  type: actionTypes.SET_OTHER_USER,
  otherUser: user,
});

export const registerUser = (creds) => {
  return async (dispatch) => {
    dispatch(uiActions.formStart());
    const country = creds.country.value;
    const phone = `+${creds.phonePrefix.value} ${creds.phoneNumber}`;
    const contacts = [];
    if (!creds.hideEmail) contacts.push('email');
    if (!creds.hidePhone) contacts.push('phone');
    const correctCreds = {
      ...creds,
      country,
      phone,
      contacts,
    };
    delete correctCreds.hideEmail;
    delete correctCreds.hidePhone;
    delete correctCreds.phoneNumber;
    delete correctCreds.phonePrefix;
    try {
      const { data } = await axios.post('/users', { data: correctCreds });
      dispatch(setProfile(data.user));
      dispatch(uiActions.setAndDeleteMessage('Your account has been created successfully!'));
      dispatch(uiActions.formSuccess());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const loginUser = (creds) => {
  return async (dispatch) => {
    dispatch(uiActions.formStart());
    try {
      const { data } = await axios.post('/users/login', { data: creds });
      dispatch(setProfile(data.user));
      dispatch(uiActions.writeChangeCartInfo(data.isDifferent));
      dispatch(uiActions.formSuccess());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const fetchProfile = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/users/me');
      dispatch(setProfile(data.user));
      dispatch(uiActions.writeChangeCartInfo(data.isDifferent));
    } catch (error) {
      dispatch(setProfile(null));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      await axios.post('/users/logout');
      dispatch(setProfile(null));
    } catch (error) {
      dispatch(uiActions.setAndDeleteMessage('Unable to logout. Something went wrong'));
    }
  };
};

export const updateUser = (creds, message) => {
  return async (dispatch) => {
    dispatch(uiActions.formStart());
    try {
      const { data } = await axios.patch('/users/me', creds);
      dispatch(setProfile(data.user));
      dispatch(uiActions.setAndDeleteMessage(message));
      dispatch(uiActions.formSuccess());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const deleteAccount = (creds, history) => {
  return async (dispatch, getState) => {
    dispatch(uiActions.formStart());
    try {
      const { username } = getState().auth.profile;
      await axios.delete('/users/me', { data: creds });
      dispatch(setProfile(null));
      dispatch(
        uiActions.setAndDeleteMessage(`Your account has been deleted. Goodbye ${username}!`),
      );
      dispatch(uiActions.formSuccess());
      history.replace(DEFAULT_PATH);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const changeDeliveryAddress = (creds) => {
  return async (dispatch) => {
    dispatch(uiActions.formStart());
    try {
      const { onlyTheseOrders } = creds;
      // eslint-disable-next-line no-param-reassign
      delete creds.onlyTheseOrders;

      if (onlyTheseOrders) {
        dispatch(setDeliveryAddress(creds));
      } else {
        const { data } = await axios.patch('/users/me', creds);
        dispatch(setProfile(data.user));
        dispatch(uiActions.setAndDeleteMessage('Delivery address has been saved in your profile'));
      }
      dispatch(uiActions.formSuccess());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const fetchOtherUser = (username) => {
  return async (dispatch) => {
    dispatch(uiActions.dataStart());
    try {
      const { data } = await axios.get(`/users/${username}`);
      dispatch(setOtherUser(data.profile));
      dispatch(uiActions.dataEnd());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(setOtherUser(null));
      dispatch(uiActions.dataEnd());
    }
  };
};

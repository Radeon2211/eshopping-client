import axios from '../../axios';
import * as actionTypes from './actionTypes';
import * as uiActions from './uiActions';
import { getErrorMessage } from '../../shared/utility';

export const setProfile = (profile) => ({
  type: actionTypes.SET_PROFILE,
  profile,
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
      const { data } = await axios.post('/users', correctCreds);
      dispatch(setProfile(data.user));
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
      const { data } = await axios.post('/users/login', creds);
      dispatch(setProfile(data.user));
      dispatch(uiActions.formSuccess());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const getProfile = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/users/me');
      dispatch(setProfile(data.user));
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
      dispatch(uiActions.setMessage('Unable to logout. Something went wrong'));
      setTimeout(() => {
        dispatch(uiActions.deleteMessage());
      }, 5000);
    }
  };
};

export const changeEmail = (creds) => {
  return async (dispatch) => {
    dispatch(uiActions.formStart());
    try {
      const { data } = await axios.patch('/users/me', creds);
      dispatch(uiActions.formSuccess());
      dispatch(setProfile(data.user));
      dispatch(uiActions.setAndDeleteMessage('Email has been changed successfully'));
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const changeName = (creds) => {
  return async (dispatch) => {
    dispatch(uiActions.formStart());
    try {
      const { data } = await axios.patch('/users/me', creds);
      dispatch(uiActions.formSuccess());
      dispatch(setProfile(data.user));
      dispatch(uiActions.setAndDeleteMessage('Name has been changed successfully'));
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const changePhoneNumber = (creds) => {
  return async (dispatch) => {
    dispatch(uiActions.formStart());
    try {
      const correctCreds = { phone: `+${creds.phonePrefix.value} ${creds.phoneNumber}` };
      const { data } = await axios.patch('/users/me', correctCreds);
      dispatch(uiActions.formSuccess());
      dispatch(setProfile(data.user));
      dispatch(uiActions.setAndDeleteMessage('Phone number has been changed successfully'));
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const changeAddress = (creds) => {
  return async (dispatch) => {
    dispatch(uiActions.formStart());
    try {
      const correctCreds = {
        ...creds,
        country: creds.country.value,
      };
      const { data } = await axios.patch('/users/me', correctCreds);
      dispatch(uiActions.formSuccess());
      dispatch(setProfile(data.user));
      dispatch(uiActions.setAndDeleteMessage('Address has been changed successfully'));
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const changeContacts = (creds) => {
  return async (dispatch) => {
    dispatch(uiActions.formStart());
    try {
      const contacts = [];
      if (!creds.hideEmail) contacts.push('email');
      if (!creds.hidePhone) contacts.push('phone');
      const correctCreds = { contacts };
      const { data } = await axios.patch('/users/me', correctCreds);
      dispatch(uiActions.formSuccess());
      dispatch(setProfile(data.user));
      dispatch(uiActions.setAndDeleteMessage('Contacts have been changed successfully'));
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const changePassword = (creds) => {
  return async (dispatch) => {
    dispatch(uiActions.formStart());
    try {
      const { data } = await axios.patch('/users/me', creds);
      dispatch(uiActions.formSuccess());
      dispatch(setProfile(data.user));
      dispatch(uiActions.setAndDeleteMessage('Password has been changed successfully'));
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

import axios from '../../axios';
import * as actionTypes from './actionTypes';
import * as uiActions from './uiActions';
import { getErrorMessage } from '../../shared/utility';
import { DEFAULT_PATH } from '../../shared/constants';

export const setProfile = (profile) => ({
  type: actionTypes.SET_PROFILE,
  profile,
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
      const { data } = await axios.post('/users', correctCreds);
      dispatch(setProfile(data.user));
      dispatch(uiActions.formSuccess());
      dispatch(uiActions.setAndDeleteMessage('Your account has been created successfully!'));
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
      dispatch(uiActions.writeChangeCartInfo(data.isDifferent));
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

export const deleteAccount = (creds, history) => {
  return async (dispatch) => {
    dispatch(uiActions.formStart());
    try {
      const { data } = await axios.delete('/users/me', { data: creds });
      dispatch(uiActions.formSuccess());
      dispatch(setProfile(null));
      dispatch(
        uiActions.setAndDeleteMessage(
          `Your account has been deleted. Goodbye ${data.user.username}!`,
        ),
      );
      history.replace(DEFAULT_PATH);
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
      dispatch(uiActions.dataSuccess());
      dispatch(setOtherUser(data.profile));
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(setOtherUser(null));
      dispatch(uiActions.dataFail(errorMessage));
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
    }
  };
};

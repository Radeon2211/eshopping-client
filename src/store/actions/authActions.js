import axios from '../../axios';
import * as actionTypes from './actionTypes';
import * as uiActions from './uiActions';
import { getErrorMessage } from '../../shared/utility';

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
    }
    delete correctCreds.hideEmail;
    delete correctCreds.hidePhone;
    delete correctCreds.phoneNumber;
    delete correctCreds.phonePrefix;
    try {
      const response = await axios.post('/users', correctCreds);
      console.log(response);
      dispatch(uiActions.formSuccess());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(uiActions.formFail(errorMessage))
    }
  };
};
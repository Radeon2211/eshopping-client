import { NavigateFunction } from 'react-router-dom';
import axios from '../../../axios';
import * as uiActions from '../uiActions/uiActions';
import { getErrorMessage } from '../../../shared/utility/utility';
import { defaultAppPath } from '../../../shared/constants';
import {
  AuthAction,
  UpdateUserData,
  ChangeDeliveryAddressData,
  ChangeEmailData,
  DeleteAccountData,
  LoginUserData,
  RegisterUserData,
} from './authActionTypes';
import { AxiosErrorType, DeliveryAddress, OtherUser, Profile } from '../../../shared/types/types';
import { TypedThunkAction } from '../../reducers/rootReducer';

export const setProfile = (profile: Profile | null) => ({
  type: AuthAction.SET_PROFILE,
  profile,
});

export const logout = () => ({
  type: AuthAction.LOGOUT_USER,
});

export const setDeliveryAddress = (deliveryAddress: DeliveryAddress) => ({
  type: AuthAction.SET_DELIVERY_ADDRESS,
  deliveryAddress,
});

export const setOtherUser = (user: OtherUser) => ({
  type: AuthAction.SET_OTHER_USER,
  otherUser: user,
});

export const registerUser = (creds: RegisterUserData): TypedThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.formStart());

      const { data } = await axios.post('/users', creds);

      dispatch(setProfile(data.user));
      dispatch(
        uiActions.setAndDeleteMessage(
          'Account has been created successfully! Check out your inbox to verify account',
        ),
      );
      dispatch(uiActions.formSuccess());
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosErrorType);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const loginUser = (creds: LoginUserData): TypedThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.formStart());
      const { data } = await axios.post('/users/login', creds);
      dispatch(setProfile(data.user));
      dispatch(uiActions.writeChangeCartInfo(data.isDifferent));
      dispatch(uiActions.formSuccess());
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosErrorType);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const fetchProfile = (): TypedThunkAction => {
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

export const logoutUser = (): TypedThunkAction => {
  return async (dispatch) => {
    try {
      await axios.post('/users/logout');
      dispatch(logout());
    } catch (error) {
      dispatch(uiActions.setAndDeleteMessage('Unable to logout. Something went wrong'));
    }
  };
};

export const updateUser = (creds: UpdateUserData, message: string): TypedThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.formStart());
      const { data } = await axios.patch('/users/me', creds);
      dispatch(setProfile(data.user));
      dispatch(uiActions.setAndDeleteMessage(message));
      dispatch(uiActions.formSuccess());
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosErrorType);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const changeEmail = (creds: ChangeEmailData): TypedThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.formStart());
      await axios.patch('/users/me/email', creds);
      dispatch(
        uiActions.setAndDeleteMessage(
          'You need to verify new email address. We sent you an email with verification link',
        ),
      );
      dispatch(uiActions.formSuccess());
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosErrorType);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const deleteAccount = (
  creds: DeleteAccountData,
  navigateFn: NavigateFunction,
): TypedThunkAction => {
  return async (dispatch, getState) => {
    try {
      dispatch(uiActions.formStart());
      const { username } = getState().auth.profile!;
      await axios.delete('/users/me', { data: creds });
      dispatch(logout());
      dispatch(
        uiActions.setAndDeleteMessage(`Your account has been deleted. Goodbye ${username}!`),
      );
      dispatch(uiActions.formSuccess());
      navigateFn(defaultAppPath, { replace: true });
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosErrorType);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const changeDeliveryAddress = (creds: ChangeDeliveryAddressData): TypedThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.formStart());
      const { onlyCurrentOrders } = creds;
      // eslint-disable-next-line no-param-reassign
      delete creds.onlyCurrentOrders;

      if (onlyCurrentOrders) {
        dispatch(setDeliveryAddress(creds));
      } else {
        const { data } = await axios.patch('/users/me', creds);
        dispatch(setProfile(data.user));
        dispatch(uiActions.setAndDeleteMessage('Delivery address has been saved in your profile'));
      }
      dispatch(uiActions.formSuccess());
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosErrorType);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const fetchOtherUser = (username: string): TypedThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.dataStart());
      const { data } = await axios.get(`/users/${username}`);
      dispatch(setOtherUser(data.profile));
      dispatch(uiActions.dataEnd());
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosErrorType);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(setOtherUser(null));
      dispatch(uiActions.dataEnd());
    }
  };
};

export const addAdmin = (email: string): TypedThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.formStart());
      await axios.patch('/users/add-admin', { email });
      dispatch(uiActions.setAndDeleteMessage(`"${email}" has been made an admin successfully`));
      dispatch(uiActions.formSuccess());
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosErrorType);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const removeAdmin = (email: string): TypedThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.formStart());
      await axios.patch('/users/remove-admin', { email });
      dispatch(
        uiActions.setAndDeleteMessage(
          `Admin privileges have been revoked from "${email}" successfully`,
        ),
      );
      dispatch(uiActions.formSuccess());
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosErrorType);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

export const sendAccountVerificationLink = (): TypedThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.formStart());
      await axios.post('/users/send-account-verification-email');
      dispatch(
        uiActions.setAndDeleteMessage('Email has been sent successfully! Check out your inbox'),
      );
      dispatch(uiActions.formSuccess());
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosErrorType);
      dispatch(uiActions.setAndDeleteMessage(errorMessage));
      dispatch(uiActions.formFail());
    }
  };
};

export const resetPassword = (email: string): TypedThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.formStart());
      await axios.post('/users/request-for-reset-password', { email });
      dispatch(
        uiActions.setAndDeleteMessage(
          'Verification email has been sent to you! Check out your inbox',
        ),
      );
      dispatch(uiActions.formSuccess());
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosErrorType);
      dispatch(uiActions.formFail(errorMessage));
    }
  };
};

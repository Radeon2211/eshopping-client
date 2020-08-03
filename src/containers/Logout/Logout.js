import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

const Logout = (props) => {
  const { history } = props;

  const dispatch = useDispatch();
  const onLogoutUser = useCallback(() => dispatch(actions.logoutUser()), [dispatch]);

  useEffect(() => {
    onLogoutUser();
    history.goBack();
  }, [onLogoutUser, history]);

  return <></>;
};

export default Logout;

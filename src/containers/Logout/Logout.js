import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaDescriptor from '../../components/MetaDescriptor/MetaDescriptor';
import * as actions from '../../store/actions/indexActions';

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogoutUser = useCallback(() => dispatch(actions.logoutUser()), [dispatch]);

  useEffect(() => {
    onLogoutUser();
    navigate(-1);
  }, []);

  return <MetaDescriptor title="Logging out..." />;
}

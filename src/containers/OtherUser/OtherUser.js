import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import * as SC from './OtherUser.sc';
import Heading from '../../components/UI/Heading/Heading';
import ProductsAndFilters from '../../components/ProductsAndFilters/ProductsAndFilters';
import { pages } from '../../shared/constants';

const UserDetails = (props) => {
  const {
    match: {
      params: { username: userUsername },
    },
    location: { search },
  } = props;

  const otherUser = useSelector((state) => state.auth.otherUser);
  const maxQuantityPerPage = useSelector((state) => state.ui.maxQuantityPerPage);

  const dispatch = useDispatch();
  const onFetchOtherUser = useCallback((username) => dispatch(actions.fetchOtherUser(username)), [
    dispatch,
  ]);
  const onSetOtherUser = useCallback(() => dispatch(actions.setOtherUser()), [dispatch]);
  const onFetchProducts = useCallback(
    (queryParams, pageType, username) =>
      dispatch(actions.fetchProducts(queryParams, pageType, username)),
    [dispatch],
  );

  useEffect(() => {
    onFetchOtherUser(userUsername);
    onFetchProducts(search, pages.USER_PRODUCTS, userUsername);
    return () => onSetOtherUser(undefined);
  }, [userUsername, onFetchOtherUser, onFetchProducts, maxQuantityPerPage, onSetOtherUser, search]);

  let content = null;
  if (otherUser === null) {
    content = (
      <Heading variant="h3" align="center" data-test="not-found">
        Such user does not exist or problem during fetching occurred
      </Heading>
    );
  } else if (otherUser) {
    const { username, email, phone } = otherUser;

    let contactData = (
      <Heading variant="h4" mgBottom="level3">
        This user has his contact data set to private
      </Heading>
    );
    if (email || phone) {
      contactData = (
        <SC.ContactData>
          {email && (
            <div className="single-data">
              <span className="data-name">Email:&nbsp;</span>
              <span className="data-value">{email}</span>
            </div>
          )}
          {phone && (
            <div className="single-data">
              <span className="data-name">Phone number:&nbsp;</span>
              <span className="data-value">{phone}</span>
            </div>
          )}
        </SC.ContactData>
      );
    }

    content = (
      <>
        <Heading variant="h3" mgBottom="level3">
          {username}
        </Heading>
        {contactData}
        <ProductsAndFilters page={pages.USER_PRODUCTS} />
      </>
    );
  }
  return content;
};

export default UserDetails;

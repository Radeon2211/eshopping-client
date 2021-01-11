import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import * as SC from './OtherUser.sc';
import Heading from '../../components/UI/Heading/Heading';
import Loader from '../../components/UI/Loader';
import ProductsAndFilters from '../../components/ProductsAndFilters/ProductsAndFilters';
import { pages } from '../../shared/constants';
import { BoldText } from '../../styled/components';

const OtherUser = (props) => {
  const {
    match: {
      params: { username: otherUserUsername },
    },
    location: { search },
    history,
  } = props;

  const userProfile = useSelector((state) => state.auth.profile);
  const currentUserUsername = userProfile?.username;
  const otherUser = useSelector((state) => state.auth.otherUser);
  const productsPerPage = useSelector((state) => state.ui.productsPerPage);

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
    if (otherUserUsername === currentUserUsername) {
      history.replace('/my-account/data');
    } else {
      onFetchOtherUser(otherUserUsername);
      onFetchProducts(search, pages.USER_PRODUCTS, otherUserUsername);
    }
    return () => onSetOtherUser(undefined);
  }, [
    otherUserUsername,
    currentUserUsername,
    onFetchOtherUser,
    onFetchProducts,
    productsPerPage,
    onSetOtherUser,
    search,
    history,
  ]);

  let content = <Loader align="center" />;
  if (otherUser === null) {
    content = (
      <Heading variant="h4" align="center" data-test="not-found">
        Such user does not exist or problem during fetching occurred
      </Heading>
    );
  } else if (otherUser) {
    const { username, email, phone } = otherUser;

    let contactData = (
      <Heading variant="h4" mgBottom="level3" data-test="private-data">
        This user has his contact data set to private
      </Heading>
    );
    if (email || phone) {
      contactData = (
        <SC.ContactData>
          {email && (
            <div className="single-data">
              <BoldText>Email:&nbsp;</BoldText>
              <span data-test="email-value">{email}</span>
            </div>
          )}
          {phone && (
            <div className="single-data">
              <BoldText>Phone number:&nbsp;</BoldText>
              <span data-test="phone-value">{phone}</span>
            </div>
          )}
        </SC.ContactData>
      );
    }

    content = (
      <>
        <Heading variant="h3" mgBottom="level3" data-test="username">
          {username}
        </Heading>
        {contactData}
        <ProductsAndFilters page={pages.USER_PRODUCTS} />
      </>
    );
  }

  return content;
};

export default OtherUser;

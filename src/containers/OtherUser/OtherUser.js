import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as actions from '../../store/actions/indexActions';
import Heading from '../../components/UI/Heading/Heading';
import Loader from '../../components/UI/Loader/Loader';
import PlainText from '../../components/UI/PlainText';
import ProductsAndFilters from '../../components/ProductsAndFilters/ProductsAndFilters';
import FlexWrapper from '../../components/UI/FlexWrapper';
import { scrollToTop } from '../../shared/utility/utility';
import MetaDescriptor from '../../components/MetaDescriptor/MetaDescriptor';
import { ProductPageType } from '../../shared/types/types';

export default function OtherUser() {
  const { username: otherUserUsername } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();

  const userProfile = useSelector((state) => state.auth.profile);
  const currentUserUsername = userProfile?.username;
  const otherUser = useSelector((state) => state.auth.otherUser);
  const productsPerPage = useSelector((state) => state.ui.productsPerPage);

  const dispatch = useDispatch();
  const onFetchOtherUser = useCallback(
    (username) => dispatch(actions.fetchOtherUser(username)),
    [dispatch],
  );
  const onSetOtherUser = useCallback((user) => dispatch(actions.setOtherUser(user)), [dispatch]);
  const onFetchProducts = useCallback(
    (queryParams, pageType, username) =>
      dispatch(actions.fetchProducts(queryParams, pageType, username)),
    [dispatch],
  );

  useEffect(() => {
    if (otherUserUsername === currentUserUsername) {
      navigate('/my-account/data', { replace: true });
    } else {
      onFetchOtherUser(otherUserUsername);
      onFetchProducts(search, ProductPageType.USER_PRODUCTS, otherUserUsername);
      scrollToTop();
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
  ]);

  let pageTitle = 'User info is loading... - E-Shopping';
  let content = <Loader align="center" />;
  if (otherUser === null) {
    pageTitle = 'User not found - E-Shopping';
    content = (
      <Heading $variant="h4" $align="center" $lineHeight="level4" data-testid="OtherUser-error">
        Such user does not exist or problem during fetching occurred
      </Heading>
    );
  } else if (otherUser) {
    const { username, email, phone } = otherUser;

    pageTitle = `User "${otherUserUsername}" - E-Shopping`;

    let contactData = (
      <Heading $variant="h4" $mgBottom="level3" data-testid="OtherUser-data-private">
        This user has his contact data set to private
      </Heading>
    );
    if (email || phone) {
      contactData = (
        <FlexWrapper $wrap="wrap" $mgBottom="level3" $spacing="level3">
          {email && (
            <PlainText $size="level4" data-testid="OtherUser-email-wrapper">
              <PlainText $weight="700">Email:&nbsp;</PlainText>
              {email}
            </PlainText>
          )}
          {phone && (
            <PlainText $size="level4" data-testid="OtherUser-phone-wrapper">
              <PlainText $weight="700">Phone number:&nbsp;</PlainText>
              {phone}
            </PlainText>
          )}
        </FlexWrapper>
      );
    }

    content = (
      <>
        <Heading $variant="h3">{username}</Heading>
        {contactData}
        <ProductsAndFilters page={ProductPageType.USER_PRODUCTS} />
      </>
    );
  }

  return (
    <>
      <MetaDescriptor
        title={pageTitle}
        description="Check out informations about this user and his products"
      />
      {content}
    </>
  );
}

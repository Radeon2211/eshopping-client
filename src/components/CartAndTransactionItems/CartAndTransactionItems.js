import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TransactionAndOrderProdItem from '../TransactionAndOrderProdItem/TransactionAndOrderProdItem';
import CartItem from './CartItem/CartItem';
import PlainText from '../UI/PlainText';
import { GreenText } from '../../styled/components';
import { itemTypes } from '../../shared/constants';
import * as propTypes from '../../shared/propTypes';

export const SC = {};
SC.SingleSeller = styled.div`
  padding: ${({ theme }) => theme.spacings.level3} 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.light3};
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

export default function CartAndTransactionItems({ items, type, isCartLoading }) {
  const sellersObject = items.reduce((acc, item) => {
    const sellerUsername =
      type === itemTypes.CART ? item.product.seller.username : item.seller.username;
    if (!acc[sellerUsername]) {
      acc[sellerUsername] = {
        items: [],
        sellerUsername,
      };
    }
    acc[sellerUsername].items.push(item);
    return acc;
  }, {});

  const sellersArray = Object.entries(sellersObject).map(([sellerUsername, rest]) => ({
    sellerUsername,
    ...rest,
  }));

  const sellerList = sellersArray.map(({ sellerUsername, items: listItem }) => (
    <SC.SingleSeller key={sellerUsername} data-testid="CartAndTransactionItems-item">
      <PlainText $size="level3" $display="block">
        <span>seller </span>
        <Link
          to={`/user/${sellerUsername}?p=1`}
          data-testid="CartAndTransactionItems-item-seller-link"
        >
          <GreenText>{sellerUsername}</GreenText>
        </Link>
      </PlainText>
      {type === itemTypes.CART
        ? listItem.map((item) => (
            <CartItem key={item._id} data={item} isCartLoading={isCartLoading} />
          ))
        : listItem.map((item) => <TransactionAndOrderProdItem key={item._id} data={item} />)}
    </SC.SingleSeller>
  ));

  return sellerList;
}

CartAndTransactionItems.defaultProps = {
  isCartLoading: undefined,
};

CartAndTransactionItems.propTypes = {
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape(propTypes.cartItem).isRequired),
    PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        photo: PropTypes.bool.isRequired,
        seller: PropTypes.shape({
          username: PropTypes.string.isRequired,
        }).isRequired,
      }),
    ),
  ]),
  type: PropTypes.oneOf([itemTypes.TRANSACTION, itemTypes.CART]).isRequired,
  isCartLoading: PropTypes.bool,
};

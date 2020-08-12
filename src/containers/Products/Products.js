import React, { useEffect, useCallback } from 'react';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import SideBySide from '../../components/UI/SideBySide/SideBySide';
import Filters from '../../components/Filters/Filters';
import ProductList from '../../components/ProductList/ProductList';
import Panel from '../../components/UI/Panel/Panel';
import Heading from '../../components/UI/Heading/Heading';

const Products = (props) => {
  const {
    location: { search },
  } = props;

  const products = useSelector((state) => state.product.products);
  const isListLoading = useSelector((state) => state.ui.isListLoading);

  const dispatch = useDispatch();
  const onFetchProducts = useCallback(
    (queryStrings) => dispatch(actions.fetchProducts(queryStrings)),
    [dispatch],
  );

  useEffect(() => {
    onFetchProducts(search);
  }, [search, onFetchProducts]);

  const { name } = queryString.parse(search);
  let headingText = 'All products';
  if (name) {
    headingText = `Results for "${name}"`;
  }

  return (
    <>
      <Heading variant="h3">{headingText}</Heading>
      <SideBySide proportion="1/3">
        <Panel>
          <Filters products={products} isListLoading={isListLoading} />
        </Panel>
        <Panel>
          <ProductList products={products} isListLoading={isListLoading} />
        </Panel>
      </SideBySide>
    </>
  );
};

export default Products;

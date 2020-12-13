import React, { useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';
import UploadPhoto from '../UploadPhoto/UploadPhoto';
import SideBySide from '../UI/SideBySide';
import { inputKinds, productRules } from '../../shared/constants';

const validationSchema = Yup.object({
  name: productRules.name,
  price: productRules.price,
  quantity: productRules.quantity,
  condition: productRules.condition,
  description: productRules.description,
});

const EditProduct = () => {
  const productDetails = useSelector((state) => state.product.productDetails);

  const dispatch = useDispatch();
  const onEditProduct = useCallback(
    (data, productId) => dispatch(actions.editProduct(data, productId)),
    [dispatch],
  );

  return (
    <Formik
      initialValues={{
        name: productDetails?.name,
        price: productDetails?.price,
        quantity: productDetails?.quantity,
        condition: productDetails?.condition,
        description: productDetails?.description,
        photo: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        onEditProduct(data, productDetails._id);
      }}
    >
      {({ errors, touched, dirty, isValid, setFieldTouched, setFieldValue, values }) => (
        <Form btnText="Edit" headingText="Edit a product" isValid={dirty && isValid} cancellable>
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'text',
              name: 'name',
              id: 'name',
              placeholder: 'Name of the product (up to 150 characters)',
              autoComplete: 'off',
              onInput: setFieldTouched.bind(this, 'name', true, true),
            }}
            label="Name"
            isValid={!errors.name}
            isTouched={touched.name}
          />
          <SideBySide proportion="1/1">
            <Input
              kind={inputKinds.INPUT}
              config={{
                type: 'number',
                name: 'price',
                id: 'price',
                placeholder: 'Price of the product',
                autoComplete: 'off',
                min: 0,
                max: 1000000,
                step: '.01',
                onInput: setFieldTouched.bind(this, 'price', true, true),
              }}
              label="Price ($)"
              isValid={!errors.price}
              isTouched={touched.price}
            />
            <Input
              kind={inputKinds.INPUT}
              config={{
                type: 'number',
                name: 'quantity',
                id: 'quantity',
                placeholder: 'Quantity you want to sell',
                min: 1,
                max: 1000000,
                onInput: setFieldTouched.bind(this, 'quantity', true, true),
              }}
              label="Quantity"
              isValid={!errors.quantity}
              isTouched={touched.quantity}
            />
          </SideBySide>
          <Input
            kind={inputKinds.RADIO}
            config={{
              name: 'condition',
              value: 'not_applicable',
              options: [
                { value: 'new', id: 'new', checked: values.condition === 'new', label: 'new' },
                { value: 'used', id: 'used', checked: values.condition === 'used', label: 'used' },
                {
                  value: 'not_applicable',
                  id: 'not_applicable',
                  checked: values.condition === 'not_applicable',
                  label: 'not applicable',
                },
              ],
            }}
            label="Condition"
          />
          <Input
            kind={inputKinds.TEXTAREA}
            config={{
              name: 'description',
              id: 'description',
              placeholder: 'Describe your product (up to 800 characters)',
              onInput: setFieldTouched.bind(this, 'description', true, true),
              maxRows: 6,
            }}
            label="Description"
            isValid={!errors.description}
            isTouched={touched.description}
          />
          <UploadPhoto
            setFieldValue={setFieldValue}
            hasCurrentPhoto={Boolean(productDetails.photo)}
          />
        </Form>
      )}
    </Formik>
  );
};

export default EditProduct;

import React, { useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import Form from '../../../components/UI/Form/Form';
import Input from '../../../components/UI/Input/Input';
import UploadPhoto from './UploadPhoto/UploadPhoto';
import SideBySide from '../../../components/UI/SideBySide/SideBySide';

const validationSchema = Yup.object({
  name: Yup.string().max(150).trim().required(),
  price: Yup.number().moreThan(0).max(1000000).required(),
  quantity: Yup.number().min(1).max(100000).required(),
  condition: Yup.string(),
  description: Yup.string().max(600).trim(),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const onAddProduct = useCallback((creds) => dispatch(actions.addProduct(creds)), [dispatch]);

  return (
    <Formik
      initialValues={{
        name: '',
        price: 0,
        quantity: 1,
        condition: 'not applicable',
        description: '',
        photo: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        onAddProduct(data);
      }}
    >
      {({ errors, touched, dirty, isValid, setFieldTouched, setFieldValue, values }) => (
        <Form btnText="Add an offer" headingText="Add product for sale" isValid={dirty && isValid} cancellable>
          <Input
            kind="input"
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
              kind="input"
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
              kind="input"
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
            kind="radio"
            config={{
              name: 'condition',
              value: 'not applicable',
              options: [
                { value: 'new', id: 'new', checked: values.condition === 'new' },
                { value: 'used', id: 'used', checked: values.condition === 'used' },
                { value: 'not applicable', id: 'not applicable', checked: values.condition === 'not applicable' },
              ],
            }}
            label="Condition"
          />
          <Input
            kind="textarea"
            config={{
              name: 'description',
              id: 'description',
              placeholder: 'Describe your product (up to 800 characters)',
              onInput: setFieldTouched.bind(this, 'description', true, true),
            }}
            label="Description"
            isValid={!errors.description}
            isTouched={touched.description}
          />
          <UploadPhoto setFieldValue={setFieldValue} />
        </Form>
      )}
    </Formik>
  );
};

export default AddProduct;

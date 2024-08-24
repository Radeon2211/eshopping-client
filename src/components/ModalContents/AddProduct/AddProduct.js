import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import Form from '../../UI/Form/Form';
import Input from '../../UI/Input/Input';
import UploadPhoto from '../../UploadPhoto/UploadPhoto';
import SideBySide from '../../UI/SideBySide';
import { productRules } from '../../../shared/constants';
import { ProductCondition } from '../../../shared/types/enums';
import { InputKind } from '../../../shared/types/types';

const validationSchema = Yup.object(productRules);

export default function AddProduct() {
  const location = useLocation();

  const dispatch = useDispatch();
  const onAddProduct = useCallback(
    (creds, currentPath) => dispatch(actions.addProduct(creds, currentPath)),
    [dispatch],
  );

  return (
    <Formik
      initialValues={{
        name: '',
        price: '',
        quantity: 1,
        condition: ProductCondition.NOT_APPLICABLE,
        description: '',
        photo: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        onAddProduct(data, location.pathname);
      }}
    >
      {({ errors, touched, dirty, isValid, setFieldTouched, setFieldValue, values }) => (
        <Form
          btnText="Add an offer"
          headingText="Add product for sale"
          isValid={dirty && isValid}
          cancellable
        >
          <Input
            kind={InputKind.INPUT}
            config={{
              type: 'text',
              name: 'name',
              id: 'name',
              placeholder: 'Name of the product (up to 150 characters)',
              autoComplete: 'off',
              autoFocus: true,
              onInput: setFieldTouched.bind(this, 'name', true, true),
              'data-testid': 'AddProduct-name',
            }}
            label="Name"
            isValid={!errors.name}
            isTouched={touched.name}
          />
          <SideBySide $proportion="1/1">
            <Input
              kind={InputKind.INPUT}
              config={{
                type: 'number',
                name: 'price',
                id: 'price',
                placeholder: 'Price of the product',
                autoComplete: 'off',
                min: 0.01,
                max: 1000000,
                step: '.01',
                onInput: setFieldTouched.bind(this, 'price', true, true),
                'data-testid': 'AddProduct-price',
              }}
              label="Price ($)"
              isValid={!errors.price}
              isTouched={touched.price}
            />
            <Input
              kind={InputKind.INPUT}
              config={{
                type: 'number',
                name: 'quantity',
                id: 'quantity',
                placeholder: 'Quantity you want to sell',
                min: 1,
                max: 1000000,
                onInput: setFieldTouched.bind(this, 'quantity', true, true),
                'data-testid': 'AddProduct-quantity',
              }}
              label="Quantity"
              isValid={!errors.quantity}
              isTouched={touched.quantity}
            />
          </SideBySide>
          <Input
            kind={InputKind.RADIO}
            config={{
              name: 'condition',
              value: ProductCondition.NOT_APPLICABLE,
              options: [
                {
                  value: ProductCondition.NEW,
                  id: ProductCondition.NEW,
                  checked: values.condition === ProductCondition.NEW,
                  label: ProductCondition.NEW,
                  'data-testid': 'AddProduct-condition-new',
                },
                {
                  value: ProductCondition.USED,
                  id: ProductCondition.USED,
                  checked: values.condition === ProductCondition.USED,
                  label: ProductCondition.USED,
                  'data-testid': 'AddProduct-condition-used',
                },
                {
                  value: ProductCondition.NOT_APPLICABLE,
                  id: ProductCondition.NOT_APPLICABLE,
                  checked: values.condition === ProductCondition.NOT_APPLICABLE,
                  label: 'not applicable',
                  'data-testid': 'AddProduct-condition-not-applicable',
                },
              ],
            }}
            label="Condition"
          />
          <Input
            kind={InputKind.TEXTAREA}
            config={{
              name: 'description',
              id: 'description',
              placeholder: 'Describe your product (up to 800 characters)',
              onInput: setFieldTouched.bind(this, 'description', true, true),
              maxRows: 6,
              'data-testid': 'AddProduct-description',
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
}

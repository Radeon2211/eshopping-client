import { useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import Form from '../../UI/Form/Form';
import Input from '../../UI/Input/Input';
import UploadPhoto from '../../UploadPhoto/UploadPhoto';
import SideBySide from '../../UI/SideBySide';
import { inputKinds, productRules } from '../../../shared/constants';
import { getChangedValues } from '../../../shared/utility/utility';
import { ProductCondition } from '../../../shared/types/enums';

const validationSchema = Yup.object(productRules);

export default function EditProduct() {
  const productDetails = useSelector((state) => state.product.productDetails);

  const dispatch = useDispatch();
  const onEditProduct = useCallback(
    (data, productId) => dispatch(actions.editProduct(data, productId)),
    [dispatch],
  );

  const initialValues = {
    name: productDetails?.name,
    price: productDetails?.price,
    quantity: productDetails?.quantity,
    condition: productDetails?.condition,
    description: productDetails?.description,
    photo: null,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        const changedValues = getChangedValues(data, initialValues);
        onEditProduct(changedValues, productDetails?._id);
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
              autoFocus: true,
              onInput: setFieldTouched.bind(this, 'name', true, true),
              'data-testid': 'EditProduct-name',
            }}
            label="Name"
            isValid={!errors.name}
            isTouched={touched.name}
          />
          <SideBySide $proportion="1/1">
            <Input
              kind={inputKinds.INPUT}
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
                'data-testid': 'EditProduct-price',
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
                'data-testid': 'EditProduct-quantity',
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
              value: ProductCondition.NOT_APPLICABLE,
              options: [
                {
                  value: ProductCondition.NEW,
                  id: ProductCondition.NEW,
                  checked: values.condition === ProductCondition.NEW,
                  label: ProductCondition.NEW,
                  'data-testid': 'EditProduct-condition-new',
                },
                {
                  value: ProductCondition.USED,
                  id: ProductCondition.USED,
                  checked: values.condition === ProductCondition.USED,
                  label: ProductCondition.USED,
                  'data-testid': 'EditProduct-condition-used',
                },
                {
                  value: ProductCondition.NOT_APPLICABLE,
                  id: ProductCondition.NOT_APPLICABLE,
                  checked: values.condition === ProductCondition.NOT_APPLICABLE,
                  label: 'not applicable',
                  'data-testid': 'EditProduct-condition-not-applicable',
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
              'data-testid': 'EditProduct-description',
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
}

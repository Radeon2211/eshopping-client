import { useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as actions from '../../../store/actions/indexActions';
import Form from '../../UI/Form/Form';
import Input from '../../UI/Input/Input';
import UploadPhoto from '../../UploadPhoto/UploadPhoto';
import SideBySide from '../../UI/SideBySide';
import { productRules } from '../../../shared/constants';
import { getChangedValues } from '../../../shared/utility/utility';
import { ProductCondition } from '../../../shared/types/enums';
import { InputKind } from '../../../shared/types/types';
import { useTypedDispatch, useTypedSelector } from '../../../store/reducers/rootReducer';
import { AddProductForm } from '../../../shared/types/forms';

const validationSchema = Yup.object(productRules);

export default function EditProduct() {
  const productDetails = useTypedSelector((state) => state.product.productDetails);

  if (!productDetails) return null;

  const dispatch = useTypedDispatch();
  const onEditProduct = useCallback(
    (data: Partial<AddProductForm>, productId: string) =>
      dispatch(actions.editProduct(data, productId)),
    [dispatch],
  );

  const initialValues = {
    name: productDetails.name,
    price: productDetails.price,
    quantity: productDetails.quantity,
    condition: productDetails.condition,
    description: productDetails.description,
    photo: null,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(data: AddProductForm) => {
        const changedValues = getChangedValues(data, initialValues);
        onEditProduct(changedValues, productDetails?._id);
      }}
    >
      {({ errors, touched, dirty, isValid, setFieldTouched, setFieldValue, values }) => (
        <Form btnText="Edit" headingText="Edit a product" isValid={dirty && isValid} cancellable>
          <Input
            kind={InputKind.INPUT}
            config={{
              type: 'text',
              name: 'name',
              id: 'name',
              placeholder: 'Name of the product (up to 150 characters)',
              autoComplete: 'off',
              autoFocus: true,
              onInput: setFieldTouched.bind(EditProduct, 'name', true, true),
              'data-testid': 'EditProduct-name',
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
                onInput: setFieldTouched.bind(EditProduct, 'price', true, true),
                'data-testid': 'EditProduct-price',
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
                onInput: setFieldTouched.bind(EditProduct, 'quantity', true, true),
                'data-testid': 'EditProduct-quantity',
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
            kind={InputKind.TEXTAREA}
            config={{
              name: 'description',
              id: 'description',
              placeholder: 'Describe your product (up to 800 characters)',
              onInput: setFieldTouched.bind(EditProduct, 'description', true, true),
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

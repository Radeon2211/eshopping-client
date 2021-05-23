import React from 'react';
import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import EditProduct from './EditProduct';
import theme from '../../../styled/theme';
import { clickAtSubmitButton, createProductItem } from '../../../shared/testUtility/testUtility';
import { productConditions, productPhotoFieldValues } from '../../../shared/constants';
import * as actions from '../../../store/actions/indexActions';
import { mockFile } from '../../../shared/utility/utility';

const mockStore = configureMockStore([thunk]);

const defaultId = 'p1';
const defaultName = 'Wellingtons';
const defaultPrice = 5.2;
const defaultQuantity = 10;
const defaultCondition = productConditions.NEW;
const defaultDescription = 'Cool wellingtons';
const defaultPhoto = true;

const setUp = () => {
  const store = mockStore({
    product: {
      productDetails: createProductItem({
        id: defaultId,
        name: defaultName,
        price: defaultPrice,
        quantity: defaultQuantity,
        condition: defaultCondition,
        photo: defaultPhoto,
        description: defaultDescription,
      }),
    },
    ui: {
      isFormLoading: false,
      formError: '',
    },
  });
  store.dispatch = jest.fn();

  return {
    ...render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <EditProduct />
        </ThemeProvider>
      </Provider>,
    ),
    store,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  editProduct: (data, productId) => ({
    data,
    productId,
  }),
}));

afterEach(cleanup);

describe('<EditProduct />', () => {
  describe('check how renders', () => {
    it('should render everything correctly', () => {
      const { asFragment } = setUp();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('check form', () => {
    const defaultNewName = 'Boots';
    const defaultNewPrice = 25.25;
    const defaultNewQuantity = 25;
    const defaultNewDescription = 'Cool boots';
    const defaultNewPhoto = mockFile.create('boots.png', 1024, 'image/png');

    it('should have empty inputs and focus on email input by default', () => {
      setUp();
      const nameInput = screen.getByTestId('EditProduct-name');
      const priceInput = screen.getByTestId('EditProduct-price');
      const quantityInput = screen.getByTestId('EditProduct-quantity');
      const conditionNewInput = screen.getByTestId('EditProduct-condition-new');
      const conditionUsedInput = screen.getByTestId('EditProduct-condition-used');
      const conditionNotAppplicableInput = screen.getByTestId(
        'EditProduct-condition-not-applicable',
      );
      const descriptionInput = screen.getByTestId('EditProduct-description');

      expect(nameInput).toHaveFocus();
      expect(nameInput.value).toEqual(defaultName);
      expect(priceInput.value).toEqual(defaultPrice.toString());
      expect(quantityInput.value).toEqual(defaultQuantity.toString());
      expect(conditionNewInput).toBeChecked();
      expect(conditionUsedInput).not.toBeChecked();
      expect(conditionNotAppplicableInput).not.toBeChecked();
      expect(descriptionInput.value).toEqual(defaultDescription);
    });

    describe('should call', () => {
      it('should call editProduct() with updated all values after inputs submits and button click', async () => {
        const { store, container } = setUp();

        const nameInput = screen.getByTestId('EditProduct-name');
        const priceInput = screen.getByTestId('EditProduct-price');
        const quantityInput = screen.getByTestId('EditProduct-quantity');
        const conditionNewInput = screen.getByTestId('EditProduct-condition-new');
        const conditionUsedInput = screen.getByTestId('EditProduct-condition-used');
        const conditionNotAppplicableInput = screen.getByTestId(
          'EditProduct-condition-not-applicable',
        );
        const descriptionInput = screen.getByTestId('EditProduct-description');
        const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');

        const dataToPass = {
          name: defaultNewName,
          price: defaultNewPrice,
          quantity: defaultNewQuantity,
          condition: productConditions.USED,
          description: defaultNewDescription,
          photo: defaultNewPhoto,
        };

        await waitFor(() => {
          fireEvent.change(nameInput, { target: { value: defaultNewName } });
        });
        await waitFor(() => {
          fireEvent.change(priceInput, { target: { value: defaultNewPrice } });
        });
        await waitFor(() => {
          fireEvent.change(quantityInput, { target: { value: defaultNewQuantity } });
        });
        await waitFor(() => {
          fireEvent.click(conditionUsedInput);
        });
        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [defaultNewPhoto] } });
        });
        await waitFor(() => {
          fireEvent.change(descriptionInput, { target: { value: defaultNewDescription } });
        });
        expect(nameInput.value).toEqual(defaultNewName);
        expect(priceInput.value).toEqual(defaultNewPrice.toString());
        expect(quantityInput.value).toEqual(defaultNewQuantity.toString());
        expect(conditionNewInput).not.toBeChecked();
        expect(conditionUsedInput).toBeChecked();
        expect(conditionNotAppplicableInput).not.toBeChecked();
        expect(descriptionInput.value).toEqual(defaultNewDescription);

        await clickAtSubmitButton(container);
        expect(store.dispatch).toHaveBeenNthCalledWith(
          1,
          actions.editProduct(dataToPass, defaultId),
        );

        await waitFor(() => {
          fireEvent.submit(nameInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          2,
          actions.editProduct(dataToPass, defaultId),
        );

        await waitFor(() => {
          fireEvent.submit(priceInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          3,
          actions.editProduct(dataToPass, defaultId),
        );

        await waitFor(() => {
          fireEvent.submit(quantityInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          4,
          actions.editProduct(dataToPass, defaultId),
        );

        await waitFor(() => {
          fireEvent.submit(conditionNewInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          5,
          actions.editProduct(dataToPass, defaultId),
        );

        await waitFor(() => {
          fireEvent.submit(conditionUsedInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          6,
          actions.editProduct(dataToPass, defaultId),
        );

        await waitFor(() => {
          fireEvent.submit(conditionNotAppplicableInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          7,
          actions.editProduct(dataToPass, defaultId),
        );

        await waitFor(() => {
          fireEvent.submit(descriptionInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          8,
          actions.editProduct(dataToPass, defaultId),
        );

        expect(store.dispatch).toHaveBeenCalledTimes(8);
      });

      describe('single values', () => {
        it('should call editProduct() with changed name only', async () => {
          const { store, container } = setUp();

          const nameInput = screen.getByTestId('EditProduct-name');
          const dataToPass = {
            name: defaultNewName,
          };

          await waitFor(() => {
            fireEvent.change(nameInput, { target: { value: defaultNewName } });
          });
          expect(nameInput.value).toEqual(defaultNewName);

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(actions.editProduct(dataToPass, defaultId));
        });

        it('should call editProduct() with changed price only', async () => {
          const { store, container } = setUp();

          const priceInput = screen.getByTestId('EditProduct-price');
          const dataToPass = {
            price: defaultNewPrice,
          };

          await waitFor(() => {
            fireEvent.change(priceInput, { target: { value: defaultNewPrice } });
          });
          expect(priceInput.value).toEqual(defaultNewPrice.toString());

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(actions.editProduct(dataToPass, defaultId));
        });

        it('should call editProduct() with changed quantity only', async () => {
          const { store, container } = setUp();

          const quantityInput = screen.getByTestId('EditProduct-quantity');
          const dataToPass = {
            quantity: defaultNewQuantity,
          };

          await waitFor(() => {
            fireEvent.change(quantityInput, { target: { value: defaultNewQuantity } });
          });
          expect(quantityInput.value).toEqual(defaultNewQuantity.toString());

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(actions.editProduct(dataToPass, defaultId));
        });

        it('should call editProduct() with changed condition only (use labels to pick condition)', async () => {
          const { store, container } = setUp();

          const conditionNewInput = screen.getByTestId('EditProduct-condition-new');
          const conditionUsedInput = screen.getByTestId('EditProduct-condition-used');
          const conditionNotAppplicableInput = screen.getByTestId(
            'EditProduct-condition-not-applicable',
          );

          const dataToPass = {
            condition: productConditions.NOT_APPLICABLE,
          };

          await waitFor(() => {
            fireEvent.click(screen.getByText(/used/i));
          });
          expect(conditionNewInput).not.toBeChecked();
          expect(conditionUsedInput).toBeChecked();
          expect(conditionNotAppplicableInput).not.toBeChecked();

          await waitFor(() => {
            fireEvent.click(screen.getByText(/new/i));
          });
          expect(conditionNewInput).toBeChecked();
          expect(conditionUsedInput).not.toBeChecked();
          expect(conditionNotAppplicableInput).not.toBeChecked();

          await waitFor(() => {
            fireEvent.click(screen.getByText(/not applicable/i));
          });
          expect(conditionNewInput).not.toBeChecked();
          expect(conditionUsedInput).not.toBeChecked();
          expect(conditionNotAppplicableInput).toBeChecked();

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(actions.editProduct(dataToPass, defaultId));
        });

        it('should call editProduct() with changed description only', async () => {
          const { store, container } = setUp();

          const descriptionInput = screen.getByTestId('EditProduct-description');
          const dataToPass = {
            description: defaultNewDescription,
          };

          await waitFor(() => {
            fireEvent.change(descriptionInput, { target: { value: defaultNewDescription } });
          });
          expect(descriptionInput.value).toEqual(defaultNewDescription);

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(actions.editProduct(dataToPass, defaultId));
        });

        it('should call editProduct() with changed photo only (photo is deleted)', async () => {
          const { store, container } = setUp();
          const dataToPass = {
            photo: productPhotoFieldValues.DELETED,
          };

          await waitFor(() => {
            fireEvent.click(screen.getByRole('button', { name: /delete current/i }));
          });

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(actions.editProduct(dataToPass, defaultId));
        });

        it('should call editProduct() with changed photo only (photo is changed)', async () => {
          const { store, container } = setUp();

          const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');
          const dataToPass = {
            photo: defaultNewPhoto,
          };

          await waitFor(() => {
            fireEvent.change(uploadPhotoInput, { target: { files: [defaultNewPhoto] } });
          });
          await waitFor(() => {});

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(actions.editProduct(dataToPass, defaultId));
        });
      });

      describe('check the lowest, highest and longest possible values', () => {
        it('should call editProduct() with max possible characters in name (price is changed)', async () => {
          const { store, container } = setUp();

          const nameInput = screen.getByTestId('EditProduct-name');

          let newName = '';
          for (let i = 1; i <= 150; i += 1) {
            newName += 'e';
          }
          const dataToPass = {
            name: newName,
          };

          await waitFor(() => {
            fireEvent.change(nameInput, { target: { value: newName } });
          });
          expect(nameInput.value).toEqual(newName);

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(actions.editProduct(dataToPass, defaultId));
        });

        it('should call editProduct() with lowest possible price (name is changed)', async () => {
          const { store, container } = setUp();

          const priceInput = screen.getByTestId('EditProduct-price');

          const newPrice = 0.01;
          const dataToPass = {
            price: newPrice,
          };

          await waitFor(() => {
            fireEvent.change(priceInput, { target: { value: newPrice } });
          });
          expect(priceInput.value).toEqual(newPrice.toString());

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(actions.editProduct(dataToPass, defaultId));
        });

        it('should call editProduct() with highest possible price (name is changed)', async () => {
          const { store, container } = setUp();

          const priceInput = screen.getByTestId('EditProduct-price');

          const newPrice = 1000000;
          const dataToPass = {
            price: newPrice,
          };

          await waitFor(() => {
            fireEvent.change(priceInput, { target: { value: newPrice } });
          });
          expect(priceInput.value).toEqual(newPrice.toString());

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(actions.editProduct(dataToPass, defaultId));
        });

        it('should call editProduct() with highest possible quantity (name is changed)', async () => {
          const { store, container } = setUp();

          const quantityInput = screen.getByTestId('EditProduct-quantity');

          const newQuantity = 100000;
          const dataToPass = {
            quantity: newQuantity,
          };

          await waitFor(() => {
            fireEvent.change(quantityInput, { target: { value: newQuantity } });
          });
          expect(quantityInput.value).toEqual(newQuantity.toString());

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(actions.editProduct(dataToPass, defaultId));
        });

        it('should call editProduct() with max possible characters in description (price is changed)', async () => {
          const { store, container } = setUp();

          const descriptionInput = screen.getByTestId('EditProduct-description');

          let newDescription = '';
          for (let i = 1; i <= 600; i += 1) {
            newDescription += 'e';
          }
          const dataToPass = {
            description: newDescription,
          };

          await waitFor(() => {
            fireEvent.change(descriptionInput, { target: { value: newDescription } });
          });
          expect(descriptionInput.value).toEqual(newDescription);

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(actions.editProduct(dataToPass, defaultId));
        });
      });
    });

    describe('should NOT call', () => {
      it('should NOT call editProduct() if all inputs have default values', async () => {
        const { store, container } = setUp();
        await clickAtSubmitButton(container);
        expect(store.dispatch).not.toHaveBeenCalled();
      });

      describe('values are too long, too high or too low', () => {
        it('should NOT call editProduct() if name is too long', async () => {
          const { store, container } = setUp();

          const nameInput = screen.getByTestId('EditProduct-name');

          let newName = '';
          for (let i = 1; i <= 151; i += 1) {
            newName += 'e';
          }

          await waitFor(() => {
            fireEvent.change(nameInput, { target: { value: newName } });
          });
          expect(nameInput.value).toEqual(newName);

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('should NOT call editProduct() if price is too low', async () => {
          const { store, container } = setUp();

          const priceInput = screen.getByTestId('EditProduct-price');
          const newPrice = 0;

          await waitFor(() => {
            fireEvent.change(priceInput, { target: { value: newPrice } });
          });
          expect(priceInput.value).toEqual(newPrice.toString());

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('should NOT call editProduct() if price is too high', async () => {
          const { store, container } = setUp();

          const priceInput = screen.getByTestId('EditProduct-price');
          const newPrice = 1000000.01;

          await waitFor(() => {
            fireEvent.change(priceInput, { target: { value: newPrice } });
          });
          expect(priceInput.value).toEqual(newPrice.toString());

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('should NOT call editProduct() if quantity is too low', async () => {
          const { store, container } = setUp();

          const quantityInput = screen.getByTestId('EditProduct-quantity');
          const newQuantity = 0;

          await waitFor(() => {
            fireEvent.change(quantityInput, { target: { value: newQuantity } });
          });
          expect(quantityInput.value).toEqual(newQuantity.toString());

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('should NOT call editProduct() if quantity is too high', async () => {
          const { store, container } = setUp();

          const quantityInput = screen.getByTestId('EditProduct-quantity');
          const newQuantity = 100001;

          await waitFor(() => {
            fireEvent.change(quantityInput, { target: { value: newQuantity } });
          });
          expect(quantityInput.value).toEqual(newQuantity.toString());

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('should NOT call editProduct() if description is too long', async () => {
          const { store, container } = setUp();

          const descriptionInput = screen.getByTestId('EditProduct-description');

          let newDescription = '';
          for (let i = 1; i <= 601; i += 1) {
            newDescription += 'e';
          }

          await waitFor(() => {
            fireEvent.change(descriptionInput, { target: { value: newDescription } });
          });
          expect(descriptionInput.value).toEqual(newDescription);

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('should NOT call addProduct() if photo is too big (price and name are changed)', async () => {
          const { store, container } = setUp();

          const nameInput = screen.getByTestId('EditProduct-name');
          const priceInput = screen.getByTestId('EditProduct-price');
          const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');
          const newPhoto = mockFile.create('wellingtons.png', 6500000, 'image/png');

          await waitFor(() => {
            fireEvent.change(nameInput, { target: { value: defaultNewName } });
          });
          await waitFor(() => {
            fireEvent.change(priceInput, { target: { value: defaultNewPrice } });
          });
          await waitFor(() => {
            fireEvent.change(uploadPhotoInput, { target: { files: [newPhoto] } });
          });
          expect(nameInput.value).toEqual(defaultNewName);
          expect(priceInput.value).toEqual(defaultNewPrice.toString());

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('should NOT call addProduct() if photo has incorrect extension (price and name are changed)', async () => {
          const { store, container } = setUp();

          const nameInput = screen.getByTestId('EditProduct-name');
          const priceInput = screen.getByTestId('EditProduct-price');
          const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');
          const newPhoto = mockFile.create('wellingtons.png', 1024, 'image/svg+xml');

          await waitFor(() => {
            fireEvent.change(nameInput, { target: { value: defaultNewName } });
          });
          await waitFor(() => {
            fireEvent.change(priceInput, { target: { value: defaultNewPrice } });
          });
          await waitFor(() => {
            fireEvent.change(uploadPhotoInput, { target: { files: [newPhoto] } });
          });
          expect(nameInput.value).toEqual(defaultNewName);
          expect(priceInput.value).toEqual(defaultNewPrice.toString());

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });
      });
    });
  });
});

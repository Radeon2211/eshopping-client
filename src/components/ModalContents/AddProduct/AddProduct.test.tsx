import { screen, fireEvent, waitFor, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AddProduct from './AddProduct';
import { clickAtSubmitButton, renderAppPart } from '../../../shared/testUtility/testUtility';
import { defaultAppPath } from '../../../shared/constants';
import * as actions from '../../../store/actions/indexActions';
import { MockFile } from '../../../shared/utility/utility';
import { ProductCondition } from '../../../shared/types/enums';
import { AddProductForm } from '../../../shared/types/forms';

const mockStore = configureMockStore([thunk]);

const setUp = () => {
  const store = mockStore({
    ui: {
      isFormLoading: false,
      formError: '',
    },
  });
  store.dispatch = jest.fn();

  return {
    ...(renderAppPart(<AddProduct />, {
      pathname: defaultAppPath,
      store,
    }) as ReturnType<typeof render>),
    store,
  };
};

jest.mock('../../../store/actions/indexActions.ts', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.ts'),
  addProduct: (data: AddProductForm, currentPath: string) => ({
    data,
    currentPath,
  }),
}));

const waitUntilSubmitButtonIsActive = async () => {
  await waitFor(async () => {
    const button = await screen.findByRole('button', { name: /add an offer/i });
    expect(button).not.toBeDisabled();
  });
};

describe('<AddProduct />', () => {
  describe('check form', () => {
    const defaultName = '';
    const defaultPrice = null;
    const defaultQuantity = 1;
    const defaultCondition = ProductCondition.NOT_APPLICABLE;
    const defaultDescription = '';
    const defaultPhoto = null;

    const defaultNewName = 'Wellingtons';
    const defaultNewPrice = 10.3;
    const defaultNewQuantity = 20;
    const defaultNewCondition = ProductCondition.NEW;
    const defaultNewDescription = 'Cool wellingtons';
    const defaultNewPhoto = MockFile.create('wellingtons.png', 1024, 'image/png');

    it('should have empty inputs and focus on email input by default', () => {
      setUp();
      const nameInput = screen.getByTestId('AddProduct-name');
      const priceInput = screen.getByTestId('AddProduct-price');
      const quantityInput = screen.getByTestId('AddProduct-quantity');
      const conditionNewInput = screen.getByTestId('AddProduct-condition-new');
      const conditionUsedInput = screen.getByTestId('AddProduct-condition-used');
      const conditionNotAppplicableInput = screen.getByTestId(
        'AddProduct-condition-not-applicable',
      );
      const descriptionInput = screen.getByTestId('AddProduct-description');

      expect(nameInput).toHaveFocus();
      expect(nameInput).toHaveValue(defaultName);
      expect(priceInput).toHaveValue(defaultPrice);
      expect(quantityInput).toHaveValue(defaultQuantity);
      expect(conditionNewInput).not.toBeChecked();
      expect(conditionUsedInput).not.toBeChecked();
      expect(conditionNotAppplicableInput).toBeChecked();
      expect(descriptionInput).toHaveValue(defaultDescription);
    });

    describe('should call', () => {
      it('should call addProduct() with updated all values after inputs submits and button click', async () => {
        const { store, container } = setUp();

        const nameInput = screen.getByTestId('AddProduct-name');
        const priceInput = screen.getByTestId('AddProduct-price');
        const quantityInput = screen.getByTestId('AddProduct-quantity');
        const conditionNewInput = screen.getByTestId('AddProduct-condition-new');
        const conditionUsedInput = screen.getByTestId('AddProduct-condition-used');
        const conditionNotAppplicableInput = screen.getByTestId(
          'AddProduct-condition-not-applicable',
        );
        const descriptionInput = screen.getByTestId('AddProduct-description');
        const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');

        const dataToPass = {
          name: defaultNewName,
          price: defaultNewPrice,
          quantity: defaultNewQuantity,
          condition: defaultNewCondition,
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
          fireEvent.click(conditionNewInput);
        });
        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [defaultNewPhoto] } });
        });
        await waitFor(() => {
          fireEvent.change(descriptionInput, { target: { value: defaultNewDescription } });
        });
        expect(nameInput).toHaveValue(defaultNewName);
        expect(priceInput).toHaveValue(defaultNewPrice);
        expect(quantityInput).toHaveValue(defaultNewQuantity);
        expect(conditionNewInput).toBeChecked();
        expect(conditionUsedInput).not.toBeChecked();
        expect(conditionNotAppplicableInput).not.toBeChecked();
        expect(descriptionInput).toHaveValue(defaultNewDescription);

        await waitUntilSubmitButtonIsActive();
        await clickAtSubmitButton(container);
        expect(store.dispatch).toHaveBeenNthCalledWith(
          1,
          actions.addProduct(dataToPass, defaultAppPath),
        );

        await waitFor(() => {
          fireEvent.submit(nameInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          2,
          actions.addProduct(dataToPass, defaultAppPath),
        );

        await waitFor(() => {
          fireEvent.submit(priceInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          3,
          actions.addProduct(dataToPass, defaultAppPath),
        );

        await waitFor(() => {
          fireEvent.submit(quantityInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          4,
          actions.addProduct(dataToPass, defaultAppPath),
        );

        await waitFor(() => {
          fireEvent.submit(conditionNewInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          5,
          actions.addProduct(dataToPass, defaultAppPath),
        );

        await waitFor(() => {
          fireEvent.submit(conditionUsedInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          6,
          actions.addProduct(dataToPass, defaultAppPath),
        );

        await waitFor(() => {
          fireEvent.submit(conditionNotAppplicableInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          7,
          actions.addProduct(dataToPass, defaultAppPath),
        );

        await waitFor(() => {
          fireEvent.submit(descriptionInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          8,
          actions.addProduct(dataToPass, defaultAppPath),
        );

        expect(store.dispatch).toHaveBeenCalledTimes(8);
      });

      it('should call addProduct() with default quantity, description, condition and photo (add photo and delete before submit)', async () => {
        const { store, container } = setUp();

        const nameInput = screen.getByTestId('AddProduct-name');
        const priceInput = screen.getByTestId('AddProduct-price');
        const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');
        const dataToPass = {
          name: defaultNewName,
          price: defaultNewPrice,
          quantity: defaultQuantity,
          condition: defaultCondition,
          description: defaultDescription,
          photo: defaultPhoto,
        };

        await waitFor(() => {
          fireEvent.change(nameInput, { target: { value: defaultNewName } });
        });
        await waitFor(() => {
          fireEvent.change(priceInput, { target: { value: defaultNewPrice } });
        });
        await waitFor(() => {
          fireEvent.change(uploadPhotoInput, { target: { files: [defaultNewPhoto] } });
        });
        await waitFor(() => {
          fireEvent.click(screen.getByRole('button', { name: /delete/i }));
        });
        expect(nameInput).toHaveValue(defaultNewName);
        expect(priceInput).toHaveValue(defaultNewPrice);

        await clickAtSubmitButton(container);

        expect(store.dispatch).toHaveBeenCalledWith(actions.addProduct(dataToPass, defaultAppPath));
      });

      it('should call addProduct() with changed name, price and condition (use labels to pick condition)', async () => {
        const { store, container } = setUp();

        const nameInput = screen.getByTestId('AddProduct-name');
        const priceInput = screen.getByTestId('AddProduct-price');
        const conditionNewInput = screen.getByTestId('AddProduct-condition-new');
        const conditionUsedInput = screen.getByTestId('AddProduct-condition-used');
        const conditionNotAppplicableInput = screen.getByTestId(
          'AddProduct-condition-not-applicable',
        );

        const dataToPass = {
          name: defaultNewName,
          price: defaultNewPrice,
          quantity: defaultQuantity,
          condition: ProductCondition.NEW,
          description: defaultDescription,
          photo: defaultPhoto,
        };

        await waitFor(() => {
          fireEvent.change(nameInput, { target: { value: defaultNewName } });
        });
        await waitFor(() => {
          fireEvent.change(priceInput, { target: { value: defaultNewPrice } });
        });
        expect(nameInput).toHaveValue(defaultNewName);
        expect(priceInput).toHaveValue(defaultNewPrice);

        await waitFor(() => {
          fireEvent.click(screen.getByText(/used/i));
        });
        expect(conditionNewInput).not.toBeChecked();
        expect(conditionUsedInput).toBeChecked();
        expect(conditionNotAppplicableInput).not.toBeChecked();

        await waitFor(() => {
          fireEvent.click(screen.getByText(/not applicable/i));
        });
        expect(conditionNewInput).not.toBeChecked();
        expect(conditionUsedInput).not.toBeChecked();
        expect(conditionNotAppplicableInput).toBeChecked();

        await waitFor(() => {
          fireEvent.click(screen.getByText(/new/i));
        });
        expect(conditionNewInput).toBeChecked();
        expect(conditionUsedInput).not.toBeChecked();
        expect(conditionNotAppplicableInput).not.toBeChecked();

        await clickAtSubmitButton(container);

        expect(store.dispatch).toHaveBeenCalledWith(actions.addProduct(dataToPass, defaultAppPath));
      });

      describe('check the lowest, highest and longest possible values', () => {
        it('should call addProduct() with max possible characters in name (price is changed)', async () => {
          const { store, container } = setUp();

          const nameInput = screen.getByTestId('AddProduct-name');
          const priceInput = screen.getByTestId('AddProduct-price');

          let newName = '';
          for (let i = 1; i <= 150; i += 1) {
            newName += 'e';
          }
          const dataToPass = {
            name: newName,
            price: defaultNewPrice,
            quantity: defaultQuantity,
            condition: defaultCondition,
            description: defaultDescription,
            photo: defaultPhoto,
          };

          await waitFor(() => {
            fireEvent.change(nameInput, { target: { value: newName } });
          });
          await waitFor(() => {
            fireEvent.change(priceInput, { target: { value: defaultNewPrice } });
          });
          expect(nameInput).toHaveValue(newName);
          expect(priceInput).toHaveValue(defaultNewPrice);

          await waitUntilSubmitButtonIsActive();
          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(
            actions.addProduct(dataToPass, defaultAppPath),
          );
        });

        it('should call addProduct() with lowest possible price (name is changed)', async () => {
          const { store, container } = setUp();

          const nameInput = screen.getByTestId('AddProduct-name');
          const priceInput = screen.getByTestId('AddProduct-price');

          const newPrice = 0.01;
          const dataToPass = {
            name: defaultNewName,
            price: newPrice,
            quantity: defaultQuantity,
            condition: defaultCondition,
            description: defaultDescription,
            photo: defaultPhoto,
          };

          await waitFor(() => {
            fireEvent.change(nameInput, { target: { value: defaultNewName } });
          });
          await waitFor(() => {
            fireEvent.change(priceInput, { target: { value: newPrice } });
          });
          expect(nameInput).toHaveValue(defaultNewName);
          expect(priceInput).toHaveValue(newPrice);

          await waitUntilSubmitButtonIsActive();
          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(
            actions.addProduct(dataToPass, defaultAppPath),
          );
        });

        it('should call addProduct() with highest possible price (name is changed)', async () => {
          const { store, container } = setUp();

          const nameInput = screen.getByTestId('AddProduct-name');
          const priceInput = screen.getByTestId('AddProduct-price');

          const newPrice = 1000000;
          const dataToPass = {
            name: defaultNewName,
            price: newPrice,
            quantity: defaultQuantity,
            condition: defaultCondition,
            description: defaultDescription,
            photo: defaultPhoto,
          };

          await waitFor(() => {
            fireEvent.change(nameInput, { target: { value: defaultNewName } });
          });
          await waitFor(() => {
            fireEvent.change(priceInput, { target: { value: newPrice } });
          });
          expect(nameInput).toHaveValue(defaultNewName);
          expect(priceInput).toHaveValue(newPrice);

          await waitUntilSubmitButtonIsActive();
          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(
            actions.addProduct(dataToPass, defaultAppPath),
          );
        });

        it('should call addProduct() with highest possible quantity (name is changed)', async () => {
          const { store, container } = setUp();

          const nameInput = screen.getByTestId('AddProduct-name');
          const priceInput = screen.getByTestId('AddProduct-price');
          const quantityInput = screen.getByTestId('AddProduct-quantity');

          const newQuantity = 100000;
          const dataToPass = {
            name: defaultNewName,
            price: defaultNewPrice,
            quantity: newQuantity,
            condition: defaultCondition,
            description: defaultDescription,
            photo: defaultPhoto,
          };

          await waitFor(() => {
            fireEvent.change(nameInput, { target: { value: defaultNewName } });
          });
          await waitFor(() => {
            fireEvent.change(priceInput, { target: { value: defaultNewPrice } });
          });
          await waitFor(() => {
            fireEvent.change(quantityInput, { target: { value: newQuantity } });
          });
          expect(nameInput).toHaveValue(defaultNewName);
          expect(priceInput).toHaveValue(defaultNewPrice);
          expect(quantityInput).toHaveValue(newQuantity);

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(
            actions.addProduct(dataToPass, defaultAppPath),
          );
        });

        it('should call addProduct() with max possible characters in description (price is changed)', async () => {
          const { store, container } = setUp();

          const nameInput = screen.getByTestId('AddProduct-name');
          const priceInput = screen.getByTestId('AddProduct-price');
          const descriptionInput = screen.getByTestId('AddProduct-description');

          let newDescription = '';
          for (let i = 1; i <= 600; i += 1) {
            newDescription += 'e';
          }
          const dataToPass = {
            name: defaultNewName,
            price: defaultNewPrice,
            quantity: defaultQuantity,
            condition: defaultCondition,
            description: newDescription,
            photo: defaultPhoto,
          };

          await waitFor(() => {
            fireEvent.change(nameInput, { target: { value: defaultNewName } });
          });
          await waitFor(() => {
            fireEvent.change(priceInput, { target: { value: defaultNewPrice } });
          });
          await waitFor(() => {
            fireEvent.change(descriptionInput, { target: { value: newDescription } });
          });
          expect(nameInput).toHaveValue(defaultNewName);
          expect(priceInput).toHaveValue(defaultNewPrice);
          expect(descriptionInput).toHaveValue(newDescription);

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(
            actions.addProduct(dataToPass, defaultAppPath),
          );
        });
      });
    });

    describe('should NOT call', () => {
      it('should NOT call addProduct() if all inputs have default values', async () => {
        const { store, container } = setUp();
        await clickAtSubmitButton(container);
        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call addProduct() if only name is given', async () => {
        const { store, container } = setUp();
        const nameInput = screen.getByTestId('AddProduct-name');

        await waitFor(() => {
          fireEvent.change(nameInput, { target: { value: defaultNewName } });
        });
        expect(nameInput).toHaveValue(defaultNewName);

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call addProduct() if only price is given', async () => {
        const { store, container } = setUp();
        const priceInput = screen.getByTestId('AddProduct-price');

        await waitFor(() => {
          fireEvent.change(priceInput, { target: { value: defaultNewPrice } });
        });
        expect(priceInput).toHaveValue(defaultNewPrice);

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });

      describe('values are too long, too high or too low', () => {
        it('should NOT call addProduct() if name is too long (price is changed)', async () => {
          const { store, container } = setUp();

          const nameInput = screen.getByTestId('AddProduct-name');
          const priceInput = screen.getByTestId('AddProduct-price');

          let newName = '';
          for (let i = 1; i <= 151; i += 1) {
            newName += 'e';
          }

          await waitFor(() => {
            fireEvent.change(nameInput, { target: { value: newName } });
          });
          await waitFor(() => {
            fireEvent.change(priceInput, { target: { value: defaultNewPrice } });
          });
          expect(nameInput).toHaveValue(newName);
          expect(priceInput).toHaveValue(defaultNewPrice);

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('should NOT call addProduct() if price is too low (name is changed)', async () => {
          const { store, container } = setUp();

          const nameInput = screen.getByTestId('AddProduct-name');
          const priceInput = screen.getByTestId('AddProduct-price');
          const newPrice = 0;

          await waitFor(() => {
            fireEvent.change(nameInput, { target: { value: defaultNewName } });
          });
          await waitFor(() => {
            fireEvent.change(priceInput, { target: { value: newPrice } });
          });
          expect(nameInput).toHaveValue(defaultNewName);
          expect(priceInput).toHaveValue(newPrice);

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('should NOT call addProduct() if price is too high (name is changed)', async () => {
          const { store, container } = setUp();

          const nameInput = screen.getByTestId('AddProduct-name');
          const priceInput = screen.getByTestId('AddProduct-price');
          const newPrice = 1000000.01;

          await waitFor(() => {
            fireEvent.change(nameInput, { target: { value: defaultNewName } });
          });
          await waitFor(() => {
            fireEvent.change(priceInput, { target: { value: newPrice } });
          });
          expect(nameInput).toHaveValue(defaultNewName);
          expect(priceInput).toHaveValue(newPrice);

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('should NOT call addProduct() if quantity is too low (price and name are changed)', async () => {
          const { store, container } = setUp();

          const nameInput = screen.getByTestId('AddProduct-name');
          const priceInput = screen.getByTestId('AddProduct-price');
          const quantityInput = screen.getByTestId('AddProduct-quantity');
          const newQuantity = 0;

          await waitFor(() => {
            fireEvent.change(nameInput, { target: { value: defaultNewName } });
          });
          await waitFor(() => {
            fireEvent.change(priceInput, { target: { value: defaultNewPrice } });
          });
          await waitFor(() => {
            fireEvent.change(quantityInput, { target: { value: newQuantity } });
          });
          expect(nameInput).toHaveValue(defaultNewName);
          expect(priceInput).toHaveValue(defaultNewPrice);
          expect(quantityInput).toHaveValue(newQuantity);

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('should NOT call addProduct() if quantity is too high (price and name are changed)', async () => {
          const { store, container } = setUp();

          const nameInput = screen.getByTestId('AddProduct-name');
          const priceInput = screen.getByTestId('AddProduct-price');
          const quantityInput = screen.getByTestId('AddProduct-quantity');
          const newQuantity = 100001;

          await waitFor(() => {
            fireEvent.change(nameInput, { target: { value: defaultNewName } });
          });
          await waitFor(() => {
            fireEvent.change(priceInput, { target: { value: defaultNewPrice } });
          });
          await waitFor(() => {
            fireEvent.change(quantityInput, { target: { value: newQuantity } });
          });
          expect(nameInput).toHaveValue(defaultNewName);
          expect(priceInput).toHaveValue(defaultNewPrice);
          expect(quantityInput).toHaveValue(newQuantity);

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('should NOT call addProduct() if description is too long (price and name are changed)', async () => {
          const { store, container } = setUp();

          const nameInput = screen.getByTestId('AddProduct-name');
          const priceInput = screen.getByTestId('AddProduct-price');
          const descriptionInput = screen.getByTestId('AddProduct-description');

          let newDescription = '';
          for (let i = 1; i <= 601; i += 1) {
            newDescription += 'e';
          }

          await waitFor(() => {
            fireEvent.change(nameInput, { target: { value: defaultNewName } });
          });
          await waitFor(() => {
            fireEvent.change(priceInput, { target: { value: defaultNewPrice } });
          });
          await waitFor(() => {
            fireEvent.change(descriptionInput, { target: { value: newDescription } });
          });
          expect(nameInput).toHaveValue(defaultNewName);
          expect(priceInput).toHaveValue(defaultNewPrice);
          expect(descriptionInput).toHaveValue(newDescription);

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('should NOT call addProduct() if photo is too big (price and name are changed)', async () => {
          const { store, container } = setUp();

          const nameInput = screen.getByTestId('AddProduct-name');
          const priceInput = screen.getByTestId('AddProduct-price');
          const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');
          const newPhoto = MockFile.create('wellingtons.png', 6500000, 'image/png');

          await waitFor(() => {
            fireEvent.change(nameInput, { target: { value: defaultNewName } });
          });
          await waitFor(() => {
            fireEvent.change(priceInput, { target: { value: defaultNewPrice } });
          });
          await waitFor(() => {
            fireEvent.change(uploadPhotoInput, { target: { files: [newPhoto] } });
          });
          expect(nameInput).toHaveValue(defaultNewName);
          expect(priceInput).toHaveValue(defaultNewPrice);

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('should NOT call addProduct() if photo has incorrect extension (price and name are changed)', async () => {
          const { store, container } = setUp();

          const nameInput = screen.getByTestId('AddProduct-name');
          const priceInput = screen.getByTestId('AddProduct-price');
          const uploadPhotoInput = screen.getByTestId('UploadPhoto-input');
          const newPhoto = MockFile.create('wellingtons.png', 1024, 'image/svg+xml');

          await waitFor(() => {
            fireEvent.change(nameInput, { target: { value: defaultNewName } });
          });
          await waitFor(() => {
            fireEvent.change(priceInput, { target: { value: defaultNewPrice } });
          });
          await waitFor(() => {
            fireEvent.change(uploadPhotoInput, { target: { files: [newPhoto] } });
          });
          expect(nameInput).toHaveValue(defaultNewName);
          expect(priceInput).toHaveValue(defaultNewPrice);

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });
      });
    });
  });
});

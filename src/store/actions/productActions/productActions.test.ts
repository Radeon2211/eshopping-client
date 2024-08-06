import moxios from 'moxios';
import axios from '../../../axios';
import { defaultErrorMessage, defaultProductsPerPage } from '../../../shared/constants';
import {
  checkReqMethodAndURL,
  createExpectedState,
  setUpStoreWithDefaultProfile,
  createProductItem,
  testStore,
} from '../../../shared/testUtility/testUtility';
import * as actions from '../indexActions';
import * as uiActions from '../uiActions/uiActions';
import * as productActions from './productActions';
import logoImage from '../../../images/logo.png';
import { ProductAction } from './productActionTypes';
import { ProductCondition, ProductPhotoFieldValue } from '../../../shared/types/enums';
import { ProductPageType } from '../../../shared/types/types';

const defaultGetStateFn = testStore().store.getState;

describe('action creators', () => {
  describe('setProducts()', () => {
    it('should return with default values', () => {
      const expectedAction = {
        type: ProductAction.SET_PRODUCTS,
        products: undefined,
        productCount: undefined,
        minPrice: 0,
        maxPrice: 0,
      };
      expect(productActions.setProducts()).toEqual(expectedAction);
    });

    it('should return with given values', () => {
      const products = [createProductItem()];
      const productCount = 1;
      const minPrice = 10;
      const maxPrice = 100;
      const expectedAction = {
        type: ProductAction.SET_PRODUCTS,
        products,
        productCount,
        minPrice,
        maxPrice,
      };
      expect(productActions.setProducts(products, productCount, minPrice, maxPrice)).toEqual(
        expectedAction,
      );
    });
  });

  describe('setProductDetails()', () => {
    it('tests setProductDetails() directly from productActions.js', () => {
      const productDetails = createProductItem();
      const expectedAction = {
        type: ProductAction.SET_PRODUCT_DETAILS,
        productDetails,
      };
      expect(productActions.setProductDetails(productDetails)).toEqual(expectedAction);
    });

    it('tests setProductDetails() directly from indexActions.ts', () => {
      const productDetails = createProductItem();
      const expectedAction = {
        type: ProductAction.SET_PRODUCT_DETAILS,
        productDetails,
      };
      expect(actions.setProductDetails(productDetails)).toEqual(expectedAction);
    });
  });

  it('tests deleteProductFromList()', () => {
    const productId = 'p1';
    const expectedAction = {
      type: ProductAction.DELETE_PRODUCT_FROM_LIST,
      productId,
    };
    expect(productActions.deleteProductFromList(productId)).toEqual(expectedAction);
  });
});

describe('async functions', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  describe('addProduct()', () => {
    const productData = {
      name: 'Wellingtons',
      price: 50,
      quantity: 5,
      condition: ProductCondition.NEW,
      description: 'Cool wellingtons',
      photo: null,
    };

    const productToPass = {
      ...productData,
      photo: undefined,
    };

    const photoToPass = new FormData();
    photoToPass.append('photo', logoImage);

    const expectedProductId = 'p1';

    describe('store', () => {
      it('is successful when product photo is given and path starts with /my-account/products', async () => {
        moxios.stubRequest('/products', {
          status: 200,
          response: {
            productId: expectedProductId,
          },
        });
        moxios.stubRequest(`/products/${expectedProductId}/photo`, {
          status: 200,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(
          // @ts-expect-error TBF after redux upgrade
          actions.addProduct(
            {
              ...productData,
              photo: logoImage,
            },
            '/my-account/products',
          ),
        );

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              message: 'Product has been added successfully. Refresh page to see it',
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'post', '/products', 1)).toEqual(true);
        expect(
          checkReqMethodAndURL(moxios, 'post', `/products/${expectedProductId}/photo`),
        ).toEqual(true);
        // @ts-expect-error TBF after redux upgrade
        expect(JSON.parse(moxios.requests.__items[0].config.data)).toEqual(productToPass);
        expect(moxios.requests.mostRecent().config.data).toEqual(photoToPass);
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items).toHaveLength(2);
      });

      it('is successful when product photo is NOT given and path NOT start with /my-account/products', async () => {
        moxios.stubRequest('/products', {
          status: 200,
          response: {
            productId: expectedProductId,
          },
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        // @ts-expect-error TBF after redux upgrade
        await store.dispatch(actions.addProduct(productData, '/products'));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              message: 'Product has been added successfully',
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'post', '/products')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(productToPass);
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed when adding product', async () => {
        moxios.stubRequest('/products', {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        // @ts-expect-error TBF after redux upgrade
        await store.dispatch(actions.addProduct(productData, '/products'));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              formError: defaultErrorMessage,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'post', '/products')).toEqual(true);
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(productToPass);
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed when adding photo', async () => {
        moxios.stubRequest('/products', {
          status: 200,
          response: {
            productId: expectedProductId,
          },
        });
        moxios.stubRequest(`/products/${expectedProductId}/photo`, {
          status: 500,
        });
        moxios.stubRequest(`/products/${expectedProductId}`, {
          status: 200,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(
          // @ts-expect-error TBF after redux upgrade
          actions.addProduct(
            {
              ...productData,
              photo: logoImage,
            },
            '/products',
          ),
        );

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              formError: defaultErrorMessage,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'post', '/products', 1)).toEqual(true);
        expect(
          checkReqMethodAndURL(moxios, 'post', `/products/${expectedProductId}/photo`, 2),
        ).toEqual(true);
        expect(checkReqMethodAndURL(moxios, 'delete', `/products/${expectedProductId}`)).toEqual(
          true,
        );
        // @ts-expect-error TBF after redux upgrade
        expect(JSON.parse(moxios.requests.__items[0].config.data)).toEqual(productToPass);
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items[1].config.data).toEqual(photoToPass);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items).toHaveLength(3);
      });

      it('is failed when adding photo and deleting product', async () => {
        moxios.stubRequest('/products', {
          status: 200,
          response: {
            productId: expectedProductId,
          },
        });
        moxios.stubRequest(`/products/${expectedProductId}/photo`, {
          status: 500,
        });
        moxios.stubRequest(`/products/${expectedProductId}`, {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        await store.dispatch(
          // @ts-expect-error TBF after redux upgrade
          actions.addProduct(
            {
              ...productData,
              photo: logoImage,
            },
            '/products',
          ),
        );

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {},
            {
              formError: 'Product has been added, but problem occured during uploading photo',
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'post', '/products', 1)).toEqual(true);
        expect(
          checkReqMethodAndURL(moxios, 'post', `/products/${expectedProductId}/photo`, 2),
        ).toEqual(true);
        expect(checkReqMethodAndURL(moxios, 'delete', `/products/${expectedProductId}`)).toEqual(
          true,
        );
        // @ts-expect-error TBF after redux upgrade
        expect(JSON.parse(moxios.requests.__items[0].config.data)).toEqual(productToPass);
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items[1].config.data).toEqual(photoToPass);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items).toHaveLength(3);
      });
    });

    describe('inner dispatch', () => {
      it('should call inner dispatch three times correctly when path starts with /my-account/products', async () => {
        moxios.stubRequest('/products', {
          status: 200,
          response: {
            productId: expectedProductId,
          },
        });
        moxios.stubRequest(`/products/${expectedProductId}/photo`, {
          status: 200,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.addProduct(
          {
            ...productData,
            photo: logoImage,
          },
          '/my-account/products',
        )(innerDispatchFn, defaultGetStateFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
          'Product has been added successfully. Refresh page to see it',
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.formSuccess());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });

      it('should call inner dispatch three times correctly when path NOT start with /my-account/products', async () => {
        moxios.stubRequest('/products', {
          status: 200,
          response: {
            productId: expectedProductId,
          },
        });
        moxios.stubRequest(`/products/${expectedProductId}/photo`, {
          status: 200,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.addProduct(
          {
            ...productData,
            photo: logoImage,
          },
          '/products',
        )(innerDispatchFn, defaultGetStateFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
          'Product has been added successfully',
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.formSuccess());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });

      it('should call inner dispatch two times correctly when adding photo is failed', async () => {
        moxios.stubRequest('/products', {
          status: 200,
          response: {
            productId: expectedProductId,
          },
        });
        moxios.stubRequest(`/products/${expectedProductId}/photo`, {
          status: 500,
        });
        moxios.stubRequest(`/products/${expectedProductId}`, {
          status: 200,
        });

        const innerDispatchFn = jest.fn();
        await actions.addProduct(
          {
            ...productData,
            photo: logoImage,
          },
          '/products',
        )(innerDispatchFn, defaultGetStateFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, uiActions.formFail(defaultErrorMessage));
        expect(innerDispatchFn).toHaveBeenCalledTimes(2);
      });

      it('should call inner dispatch two times correctly when adding photo and deleting product is failed', async () => {
        moxios.stubRequest('/products', {
          status: 200,
          response: {
            productId: expectedProductId,
          },
        });
        moxios.stubRequest(`/products/${expectedProductId}/photo`, {
          status: 500,
        });
        moxios.stubRequest(`/products/${expectedProductId}`, {
          status: 500,
        });

        const innerDispatchFn = jest.fn();
        await actions.addProduct(
          {
            ...productData,
            photo: logoImage,
          },
          '/products',
        )(innerDispatchFn, defaultGetStateFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(
          2,
          uiActions.formFail('Product has been added, but problem occured during uploading photo'),
        );
        expect(innerDispatchFn).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('editProduct()', () => {
    const editedProps = {
      quantity: 10,
      price: 40,
      name: 'Boots',
      description: 'Cool boots',
      condition: ProductCondition.USED,
    };

    const productData = {
      ...editedProps,
      photo: null,
    };

    const productToPass = {
      ...productData,
      photo: undefined,
    };

    const photoToPass = new FormData();
    photoToPass.append('photo', logoImage);

    const productId = 'p1';

    const defaultProduct = createProductItem({
      _id: productId,
      quantity: 5,
      price: 50,
      name: 'Wellingtons',
      quantitySold: 3,
      buyerQuantity: 2,
      description: 'Cool wellingtons',
      condition: ProductCondition.NEW,
      seller: {
        username: 'john',
      },
    });

    const expectedProduct = {
      ...defaultProduct,
      ...editedProps,
    };

    describe('store', () => {
      describe('is successful', () => {
        describe('Passed with photo null', () => {
          it('should NOT call second request', async () => {
            moxios.stubRequest(`/products/${productId}`, {
              status: 200,
              response: {
                product: expectedProduct,
              },
            });

            const { store, initialState } = setUpStoreWithDefaultProfile(
              {},
              {
                productDetails: defaultProduct,
              },
            );
            // @ts-expect-error TBF after redux upgrade
            await store.dispatch(actions.editProduct(productData, productId));

            expect(store.getState()).toEqual(
              createExpectedState(
                initialState,
                {},
                {
                  productDetails: expectedProduct,
                },
                {
                  message: 'Product has been edited successfully',
                },
              ),
            );
            expect(checkReqMethodAndURL(moxios, 'patch', `/products/${productId}`)).toEqual(true);
            expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(productToPass);
            // @ts-expect-error TBF after redux upgrade
            expect(moxios.requests.__items).toHaveLength(1);
          });
        });

        describe('Passed with photo "DELETED"', () => {
          it('should delete photo and photo by default is false', async () => {
            moxios.stubRequest(`/products/${productId}`, {
              status: 200,
              response: {
                product: expectedProduct,
              },
            });
            moxios.stubRequest(`/products/${productId}/photo`, {
              status: 200,
            });

            const { store, initialState } = setUpStoreWithDefaultProfile(
              {},
              {
                productDetails: defaultProduct,
              },
            );
            await store.dispatch(
              // @ts-expect-error TBF after redux upgrade
              actions.editProduct(
                {
                  ...productData,
                  photo: ProductPhotoFieldValue.DELETED,
                },
                productId,
              ),
            );

            expect(store.getState()).toEqual(
              createExpectedState(
                initialState,
                {},
                {
                  productDetails: expectedProduct,
                },
                {
                  message: 'Product has been edited successfully',
                },
              ),
            );
            expect(checkReqMethodAndURL(moxios, 'patch', `/products/${productId}`, 1)).toEqual(
              true,
            );
            expect(checkReqMethodAndURL(moxios, 'delete', `/products/${productId}/photo`)).toEqual(
              true,
            );
            // @ts-expect-error TBF after redux upgrade
            expect(JSON.parse(moxios.requests.__items[0].config.data)).toEqual(productToPass);
            expect(moxios.requests.mostRecent().config.data).toBeUndefined();
            // @ts-expect-error TBF after redux upgrade
            expect(moxios.requests.__items).toHaveLength(2);
          });

          it('should delete photo and photo by default is true', async () => {
            moxios.stubRequest(`/products/${productId}`, {
              status: 200,
              response: {
                product: {
                  ...expectedProduct,
                  photo: true,
                },
              },
            });
            moxios.stubRequest(`/products/${productId}/photo`, {
              status: 200,
            });

            const { store, initialState } = setUpStoreWithDefaultProfile(
              {},
              {
                productDetails: {
                  ...defaultProduct,
                  photo: true,
                },
              },
            );
            await store.dispatch(
              // @ts-expect-error TBF after redux upgrade
              actions.editProduct(
                {
                  ...productData,
                  photo: ProductPhotoFieldValue.DELETED,
                },
                productId,
              ),
            );

            expect(store.getState()).toEqual(
              createExpectedState(
                initialState,
                {},
                {
                  productDetails: expectedProduct,
                },
                {
                  message: 'Product has been edited successfully',
                },
              ),
            );
            expect(checkReqMethodAndURL(moxios, 'patch', `/products/${productId}`, 1)).toEqual(
              true,
            );
            expect(checkReqMethodAndURL(moxios, 'delete', `/products/${productId}/photo`)).toEqual(
              true,
            );
            // @ts-expect-error TBF after redux upgrade
            expect(JSON.parse(moxios.requests.__items[0].config.data)).toEqual(productToPass);
            expect(moxios.requests.mostRecent().config.data).toBeUndefined();
            // @ts-expect-error TBF after redux upgrade
            expect(moxios.requests.__items).toHaveLength(2);
          });
        });

        describe('Passed with photo file', () => {
          it('should update photo and photo by default is false', async () => {
            moxios.stubRequest(`/products/${productId}`, {
              status: 200,
              response: {
                product: expectedProduct,
              },
            });
            moxios.stubRequest(`/products/${productId}/photo`, {
              status: 200,
            });

            const { store, initialState } = setUpStoreWithDefaultProfile(
              {},
              {
                productDetails: defaultProduct,
              },
            );
            await store.dispatch(
              // @ts-expect-error TBF after redux upgrade
              actions.editProduct(
                {
                  ...productData,
                  photo: logoImage,
                },
                productId,
              ),
            );

            expect(store.getState()).toEqual(
              createExpectedState(
                initialState,
                {},
                {
                  productDetails: {
                    ...expectedProduct,
                    photo: true,
                  },
                },
                {
                  message: 'Product has been edited successfully',
                },
              ),
            );
            expect(checkReqMethodAndURL(moxios, 'patch', `/products/${productId}`, 1)).toEqual(
              true,
            );
            expect(checkReqMethodAndURL(moxios, 'post', `/products/${productId}/photo`)).toEqual(
              true,
            );
            // @ts-expect-error TBF after redux upgrade
            expect(JSON.parse(moxios.requests.__items[0].config.data)).toEqual(productToPass);
            expect(moxios.requests.mostRecent().config.data).toEqual(photoToPass);
            // @ts-expect-error TBF after redux upgrade
            expect(moxios.requests.__items).toHaveLength(2);
          });

          it('should update photo and photo by default is true', async () => {
            moxios.stubRequest(`/products/${productId}`, {
              status: 200,
              response: {
                product: {
                  ...expectedProduct,
                  photo: true,
                },
              },
            });
            moxios.stubRequest(`/products/${productId}/photo`, {
              status: 200,
            });

            const { store, initialState } = setUpStoreWithDefaultProfile(
              {},
              {
                productDetails: {
                  ...defaultProduct,
                  photo: true,
                },
              },
            );
            await store.dispatch(
              // @ts-expect-error TBF after redux upgrade
              actions.editProduct(
                {
                  ...productData,
                  photo: logoImage,
                },
                productId,
              ),
            );

            expect(store.getState()).toEqual(
              createExpectedState(
                initialState,
                {},
                {
                  productDetails: {
                    ...expectedProduct,
                    photo: true,
                  },
                },
                {
                  message: 'Product has been edited successfully',
                },
              ),
            );
            expect(checkReqMethodAndURL(moxios, 'patch', `/products/${productId}`, 1)).toEqual(
              true,
            );
            expect(checkReqMethodAndURL(moxios, 'post', `/products/${productId}/photo`)).toEqual(
              true,
            );
            // @ts-expect-error TBF after redux upgrade
            expect(JSON.parse(moxios.requests.__items[0].config.data)).toEqual(productToPass);
            expect(moxios.requests.mostRecent().config.data).toEqual(photoToPass);
            // @ts-expect-error TBF after redux upgrade
            expect(moxios.requests.__items).toHaveLength(2);
          });
        });
      });

      describe('is failed', () => {
        it('should fail at updating product', async () => {
          moxios.stubRequest(`/products/${productId}`, {
            status: 500,
          });

          const { store, initialState } = setUpStoreWithDefaultProfile(
            {},
            {
              productDetails: defaultProduct,
            },
          );
          // @ts-expect-error TBF after redux upgrade
          await store.dispatch(actions.editProduct(productData, productId));

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {},
              {},
              {
                formError: defaultErrorMessage,
              },
            ),
          );
          expect(checkReqMethodAndURL(moxios, 'patch', `/products/${productId}`)).toEqual(true);
          expect(JSON.parse(moxios.requests.mostRecent().config.data)).toEqual(productToPass);
          // @ts-expect-error TBF after redux upgrade
          expect(moxios.requests.__items).toHaveLength(1);
        });

        it('should fail at deleting photo', async () => {
          moxios.stubRequest(`/products/${productId}`, {
            status: 200,
            response: {
              product: expectedProduct,
            },
          });
          moxios.stubRequest(`/products/${productId}/photo`, {
            status: 500,
          });

          const { store, initialState } = setUpStoreWithDefaultProfile(
            {},
            {
              productDetails: defaultProduct,
            },
          );
          await store.dispatch(
            // @ts-expect-error TBF after redux upgrade
            actions.editProduct(
              {
                ...productData,
                photo: ProductPhotoFieldValue.DELETED,
              },
              productId,
            ),
          );

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {},
              {},
              {
                formError: defaultErrorMessage,
              },
            ),
          );
          expect(checkReqMethodAndURL(moxios, 'patch', `/products/${productId}`, 1)).toEqual(true);
          expect(checkReqMethodAndURL(moxios, 'delete', `/products/${productId}/photo`)).toEqual(
            true,
          );
          // @ts-expect-error TBF after redux upgrade
          expect(JSON.parse(moxios.requests.__items[0].config.data)).toEqual(productToPass);
          expect(moxios.requests.mostRecent().config.data).toBeUndefined();
          // @ts-expect-error TBF after redux upgrade
          expect(moxios.requests.__items).toHaveLength(2);
        });

        it('should fail at updating photo', async () => {
          moxios.stubRequest(`/products/${productId}`, {
            status: 200,
            response: {
              product: expectedProduct,
            },
          });
          moxios.stubRequest(`/products/${productId}/photo`, {
            status: 500,
          });

          const { store, initialState } = setUpStoreWithDefaultProfile(
            {},
            {
              productDetails: defaultProduct,
            },
          );
          await store.dispatch(
            // @ts-expect-error TBF after redux upgrade
            actions.editProduct(
              {
                ...productData,
                photo: logoImage,
              },
              productId,
            ),
          );

          expect(store.getState()).toEqual(
            createExpectedState(
              initialState,
              {},
              {},
              {
                formError: defaultErrorMessage,
              },
            ),
          );
          expect(checkReqMethodAndURL(moxios, 'patch', `/products/${productId}`, 1)).toEqual(true);
          expect(checkReqMethodAndURL(moxios, 'post', `/products/${productId}/photo`)).toEqual(
            true,
          );
          // @ts-expect-error TBF after redux upgrade
          expect(JSON.parse(moxios.requests.__items[0].config.data)).toEqual(productToPass);
          expect(moxios.requests.mostRecent().config.data).toEqual(photoToPass);
          // @ts-expect-error TBF after redux upgrade
          expect(moxios.requests.__items).toHaveLength(2);
        });
      });
    });

    describe('inner dispatch', () => {
      it('is successful when product should have photo false', async () => {
        moxios.stubRequest(`/products/${productId}`, {
          status: 200,
          response: {
            product: expectedProduct,
          },
        });
        moxios.stubRequest(`/products/${productId}/photo`, {
          status: 200,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.editProduct(
          {
            ...productData,
            photo: logoImage,
          },
          productId,
        )(innerDispatchFn, defaultGetStateFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(
          2,
          productActions.setProductDetails({
            ...expectedProduct,
            photo: false,
          }),
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(
          3,
          productActions.setProductDetails({
            ...expectedProduct,
            photo: true,
          }),
        );
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
          'Product has been edited successfully',
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(5, uiActions.formSuccess());
        expect(innerDispatchFn).toHaveBeenCalledTimes(5);

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });

      it('is successful when product should have photo false', async () => {
        moxios.stubRequest(`/products/${productId}`, {
          status: 200,
          response: {
            product: expectedProduct,
          },
        });
        moxios.stubRequest(`/products/${productId}/photo`, {
          status: 200,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.editProduct(
          {
            ...productData,
            photo: ProductPhotoFieldValue.DELETED,
          },
          productId,
        )(innerDispatchFn, defaultGetStateFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(
          2,
          productActions.setProductDetails({
            ...expectedProduct,
            photo: false,
          }),
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(
          3,
          productActions.setProductDetails({
            ...expectedProduct,
            photo: false,
          }),
        );
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
          'Product has been edited successfully',
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(5, uiActions.formSuccess());
        expect(innerDispatchFn).toHaveBeenCalledTimes(5);

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });

      it('is failed', async () => {
        moxios.stubRequest(`/products/${productId}`, {
          status: 200,
          response: {
            product: expectedProduct,
          },
        });
        moxios.stubRequest(`/products/${productId}/photo`, {
          status: 500,
        });

        const innerDispatchFn = jest.fn();
        await actions.editProduct(
          {
            ...productData,
            photo: ProductPhotoFieldValue.DELETED,
          },
          productId,
        )(innerDispatchFn, defaultGetStateFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, uiActions.formFail(defaultErrorMessage));
        expect(innerDispatchFn).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('fetchProducts()', () => {
    const expectedProducts = [createProductItem(), createProductItem()];
    const expectedProductCount = 2;
    const expectedMinPrice = 10;
    const expectedMaxPrice = 100;

    describe('store', () => {
      it('is successful and page is ALL_PRODUCTS and page number is 1', async () => {
        moxios.stubRequest(/products.*/, {
          status: 200,
          response: {
            products: expectedProducts,
            productCount: expectedProductCount,
            productPrices: [
              {
                minPrice: expectedMinPrice,
                maxPrice: expectedMaxPrice,
              },
            ],
          },
        });

        const { store, initialState } = setUpStoreWithDefaultProfile(
          {},
          {
            productCount: 5,
          },
        );
        // @ts-expect-error TBF after redux upgrade
        await store.dispatch(actions.fetchProducts('?p=1', ProductPageType.ALL_PRODUCTS));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {
              products: expectedProducts,
              productCount: expectedProductCount,
              minPrice: expectedMinPrice,
              maxPrice: expectedMaxPrice,
            },
          ),
        );
        expect(
          checkReqMethodAndURL(
            moxios,
            'get',
            `/products?limit=${defaultProductsPerPage}&p=1&page=${ProductPageType.ALL_PRODUCTS}`,
          ),
        ).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is successful and page is USER_PRODUCTS and page number is lower than 1 and sellerUsername is john', async () => {
        moxios.stubRequest(/products.*/, {
          status: 200,
          response: {
            products: expectedProducts,
            productCount: expectedProductCount,
            productPrices: [
              {
                minPrice: expectedMinPrice,
                maxPrice: expectedMaxPrice,
              },
            ],
          },
        });

        const { store, initialState } = setUpStoreWithDefaultProfile(
          {},
          {
            productCount: 5,
          },
          {
            productsPerPage: 5,
          },
        );
        await store.dispatch(
          // @ts-expect-error TBF after redux upgrade
          actions.fetchProducts(
            '?p=-1&minPrice=5&maxPrice=150',
            ProductPageType.USER_PRODUCTS,
            'john',
          ),
        );

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {
              products: expectedProducts,
              productCount: expectedProductCount,
              minPrice: expectedMinPrice,
              maxPrice: expectedMaxPrice,
            },
          ),
        );
        expect(
          checkReqMethodAndURL(
            moxios,
            'get',
            `/products?limit=5&maxPrice=150&minPrice=5&page=${ProductPageType.USER_PRODUCTS}&seller=john`,
          ),
        ).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is successful and page is MY_PRODUCTS and page number is too high and response has empty products array', async () => {
        moxios.stubRequest(/products.*/, {
          status: 200,
          response: {
            products: [],
            productCount: 0,
            productPrices: [],
          },
        });

        const { store, initialState } = setUpStoreWithDefaultProfile(
          {},
          {
            productCount: 5,
          },
          {
            productsPerPage: 15,
          },
        );
        // @ts-expect-error TBF after redux upgrade
        await store.dispatch(actions.fetchProducts('?p=10&seller=me', ProductPageType.MY_PRODUCTS));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {
              products: [],
              productCount: 0,
            },
          ),
        );
        expect(
          checkReqMethodAndURL(
            moxios,
            'get',
            `/products?limit=15&page=${ProductPageType.MY_PRODUCTS}`,
          ),
        ).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed', async () => {
        moxios.stubRequest(/products.*/, {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        // @ts-expect-error TBF after redux upgrade
        await store.dispatch(actions.fetchProducts('?p=1', ProductPageType.ALL_PRODUCTS));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {
              products: null,
            },
            {
              message: 'Something went wrong',
            },
          ),
        );
        expect(
          checkReqMethodAndURL(
            moxios,
            'get',
            `/products?limit=${defaultProductsPerPage}&p=1&page=${ProductPageType.ALL_PRODUCTS}`,
          ),
        ).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is successful and response has expected products', async () => {
        moxios.stubRequest(/products.*/, {
          status: 200,
          response: {
            products: expectedProducts,
            productCount: expectedProductCount,
            productPrices: [
              {
                minPrice: expectedMinPrice,
                maxPrice: expectedMaxPrice,
              },
            ],
          },
        });

        const innerDispatchFn = jest.fn();
        const { store } = setUpStoreWithDefaultProfile();
        await actions.fetchProducts('?p=1', ProductPageType.ALL_PRODUCTS)(
          innerDispatchFn,
          store.getState,
        );

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.dataStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(
          2,
          productActions.setProducts(
            expectedProducts,
            expectedProductCount,
            expectedMinPrice,
            expectedMaxPrice,
          ),
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.dataEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);
      });

      it('is successful and response has empty products array', async () => {
        moxios.stubRequest(/products.*/, {
          status: 200,
          response: {
            products: [],
            productCount: 0,
            productPrices: [],
          },
        });

        const innerDispatchFn = jest.fn();
        const { store } = setUpStoreWithDefaultProfile();
        await actions.fetchProducts('?p=1', ProductPageType.ALL_PRODUCTS)(
          innerDispatchFn,
          store.getState,
        );

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.dataStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, productActions.setProducts([], 0, 0, 0));
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.dataEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);
      });

      it('is failed', async () => {
        moxios.stubRequest(/products.*/, {
          status: 500,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        const { store } = setUpStoreWithDefaultProfile();
        await actions.fetchProducts('?p=1', ProductPageType.ALL_PRODUCTS)(
          innerDispatchFn,
          store.getState,
        );

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.dataStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(defaultErrorMessage);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, productActions.setProducts(null));
        expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.dataEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(4);

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });
    });
  });

  describe('fetchProductDetails()', () => {
    const productId = 'p1';
    const expectedProduct = createProductItem({
      _id: productId,
    });

    describe('store', () => {
      it('is successful', async () => {
        moxios.stubRequest(`/products/${productId}`, {
          status: 200,
          response: {
            product: expectedProduct,
          },
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        // @ts-expect-error TBF after redux upgrade
        await store.dispatch(actions.fetchProductDetails(productId));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {
              productDetails: expectedProduct,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'get', `/products/${productId}`)).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed due to incorrect Id', async () => {
        moxios.stubRequest(`/products/${productId}`, {
          status: 500,
          response: {
            kind: 'ObjectId',
          },
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        // @ts-expect-error TBF after redux upgrade
        await store.dispatch(actions.fetchProductDetails(productId));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {
              productDetails: null,
            },
            {
              message: 'Product ID given in URL is not correct',
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'get', `/products/${productId}`)).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed due to other reason', async () => {
        moxios.stubRequest(`/products/${productId}`, {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile();
        // @ts-expect-error TBF after redux upgrade
        await store.dispatch(actions.fetchProductDetails(productId));

        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {
              productDetails: null,
            },
            {
              message: defaultErrorMessage,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'get', `/products/${productId}`)).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is failed due to incorrect Id', async () => {
        moxios.stubRequest(`/products/${productId}`, {
          status: 200,
          response: {
            product: expectedProduct,
          },
        });

        const innerDispatchFn = jest.fn();
        await actions.fetchProductDetails(productId)(innerDispatchFn, defaultGetStateFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.dataStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(
          2,
          productActions.setProductDetails(expectedProduct),
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, uiActions.dataEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(3);
      });

      it('is failed due to incorrect Id', async () => {
        moxios.stubRequest(`/products/${productId}`, {
          status: 500,
          response: {
            kind: 'ObjectId',
          },
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.fetchProductDetails(productId)(innerDispatchFn, defaultGetStateFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.dataStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
          'Product ID given in URL is not correct',
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, productActions.setProductDetails(null));
        expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.dataEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(4);

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });

      it('is failed due to other reason', async () => {
        moxios.stubRequest(`/products/${productId}`, {
          status: 500,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.fetchProductDetails(productId)(innerDispatchFn, defaultGetStateFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.dataStart());
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(defaultErrorMessage);
        expect(innerDispatchFn).toHaveBeenNthCalledWith(3, productActions.setProductDetails(null));
        expect(innerDispatchFn).toHaveBeenNthCalledWith(4, uiActions.dataEnd());
        expect(innerDispatchFn).toHaveBeenCalledTimes(4);

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });
    });
  });

  describe('deleteProduct()', () => {
    const productId = 'p1';
    const defaultProductDetails = createProductItem({
      _id: productId,
    });
    const defaultProducts = [
      defaultProductDetails,
      createProductItem({
        _id: 'p2',
      }),
    ];

    describe('store', () => {
      it('is successful', async () => {
        moxios.stubRequest(`/products/${productId}`, {
          status: 200,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile(
          {},
          {
            products: defaultProducts,
            productDetails: defaultProductDetails,
          },
        );
        const navigateFn = jest.fn();
        // @ts-expect-error TBF after redux upgrade
        await store.dispatch(actions.deleteProduct(productId, navigateFn));

        expect(navigateFn).toHaveBeenCalledWith(-1);
        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {
              products: [defaultProducts[1]],
              productDetails: undefined,
            },
            {
              message: 'Product has been deleted successfully',
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'delete', `/products/${productId}`)).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items).toHaveLength(1);
      });

      it('is failed', async () => {
        moxios.stubRequest(`/products/${productId}`, {
          status: 500,
        });

        const { store, initialState } = setUpStoreWithDefaultProfile(
          {},
          {
            products: defaultProducts,
            productDetails: defaultProductDetails,
          },
        );
        const navigateFn = jest.fn();
        // @ts-expect-error TBF after redux upgrade
        await store.dispatch(actions.deleteProduct(productId, navigateFn));

        expect(navigateFn).not.toHaveBeenCalled();
        expect(store.getState()).toEqual(
          createExpectedState(
            initialState,
            {},
            {
              products: defaultProducts,
              productDetails: defaultProductDetails,
            },
            {
              formError: defaultErrorMessage,
            },
          ),
        );
        expect(checkReqMethodAndURL(moxios, 'delete', `/products/${productId}`)).toEqual(true);
        expect(moxios.requests.mostRecent().config.data).toBeUndefined();
        // @ts-expect-error TBF after redux upgrade
        expect(moxios.requests.__items).toHaveLength(1);
      });
    });

    describe('inner dispatch', () => {
      it('is successful', async () => {
        moxios.stubRequest(`/products/${productId}`, {
          status: 200,
        });

        const originalSetAndDeleteMessage = uiActions.setAndDeleteMessage;

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = jest.fn();
        const innerDispatchFn = jest.fn();
        await actions.deleteProduct(productId, jest.fn())(innerDispatchFn, defaultGetStateFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(
          2,
          productActions.setProductDetails(undefined),
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(
          3,
          productActions.deleteProductFromList(productId),
        );
        expect(uiActions.setAndDeleteMessage).toHaveBeenCalledWith(
          'Product has been deleted successfully',
        );
        expect(innerDispatchFn).toHaveBeenNthCalledWith(5, uiActions.formSuccess());
        expect(innerDispatchFn).toHaveBeenCalledTimes(5);

        // @ts-expect-error TBF after redux upgrade
        uiActions.setAndDeleteMessage = originalSetAndDeleteMessage;
      });

      it('is failed', async () => {
        moxios.stubRequest(`/products/${productId}`, {
          status: 500,
        });

        const innerDispatchFn = jest.fn();
        // @ts-expect-error TBF after redux upgrade
        await actions.deleteProduct(productId, { goBack: jest.fn() })(innerDispatchFn);

        expect(innerDispatchFn).toHaveBeenNthCalledWith(1, uiActions.formStart());
        expect(innerDispatchFn).toHaveBeenNthCalledWith(2, uiActions.formFail(defaultErrorMessage));
        expect(innerDispatchFn).toHaveBeenCalledTimes(2);
      });
    });
  });
});

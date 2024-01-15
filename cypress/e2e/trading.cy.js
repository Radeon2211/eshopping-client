import { activeUser } from '../fixtures/users';
import { productOne } from '../fixtures/products';
import { formatPrice } from '../../src/shared/utility/utility';
import { modalTypes, singleInfoNames } from '../../src/shared/constants';

const usedUser = activeUser;
const usedProduct = productOne;

const newDeliveryAddress = {
  firstName: 'New',
  lastName: 'Name',
  street: 'Merrion Way 66',
  zipCode: '35004',
  city: 'Leeds',
  country: 'United Kingdom',
  phone: '+44 111-222-3333',
  phoneNumber: '111-222-3333',
  phonePrefixLabel: '+44 United Kingdom',
};

const fillDeliveryAddressForm = (data) => {
  cy.findByTestId('ChangeDeliveryAddress-firstName').clear();
  cy.findByTestId('ChangeDeliveryAddress-firstName').type(data.firstName);
  cy.findByTestId('ChangeDeliveryAddress-lastName').clear();
  cy.findByTestId('ChangeDeliveryAddress-lastName').type(data.lastName);
  cy.findByTestId('ChangeDeliveryAddress-street').clear();
  cy.findByTestId('ChangeDeliveryAddress-street').type(data.street);
  cy.findByTestId('ChangeDeliveryAddress-zipCode').clear();
  cy.findByTestId('ChangeDeliveryAddress-zipCode').type(data.zipCode);
  cy.findByTestId('ChangeDeliveryAddress-city').clear();
  cy.findByTestId('ChangeDeliveryAddress-city').type(data.city);
  cy.get('#country').click();
  cy.findByText(data.country).click();
  cy.get('#phonePrefix').click();
  cy.findByText(data.phonePrefixLabel).click();
  cy.findByTestId('ChangeDeliveryAddress-phoneNumber').clear();
  cy.findByTestId('ChangeDeliveryAddress-phoneNumber').type(data.phoneNumber);
};

const checkTransactionOrOrderProdItems = (quantityBought) => {
  cy.findAllByTestId('TransactionAndOrderProdItem').within(() => {
    cy.findByTestId('TransactionAndOrderProdItem-product-link-name').should(
      'have.text',
      usedProduct.name,
    );
    cy.findByText(`${quantityBought} x ${formatPrice(usedProduct.price)}`).should('exist');
    cy.findByText(formatPrice(quantityBought * usedProduct.price)).should('exist');
  });
};

const checkDeliveryAddressInAccountData = (data) => {
  const checkData = () => {
    cy.findByTestId(`SingleInfo-${singleInfoNames.NAME}`).findByText(
      `${data.firstName} ${data.lastName}`,
    );
    cy.findByTestId(`SingleInfo-${singleInfoNames.ADDRESS}`).within(() => {
      cy.findByText(data.street).should('exist');
      cy.findByText(`${data.zipCode} ${data.city}`).should('exist');
      cy.findByText(data.country).should('exist');
    });
    cy.findByTestId(`SingleInfo-${singleInfoNames.PHONE_NUMBER}`)
      .findByText(data.phone)
      .should('exist');
  };
  checkData();
  cy.reload();
  checkData();
};

const checkDeliveryAddressInOrderDetails = () => {
  const checkData = () => {
    cy.findByTestId('OrderDetails-delivery-address-section').within(() => {
      cy.findByText(`${newDeliveryAddress.firstName} ${newDeliveryAddress.lastName}`).should(
        'exist',
      );
      cy.findByText(newDeliveryAddress.street).should('exist');
      cy.findByText(`${newDeliveryAddress.zipCode} ${newDeliveryAddress.city}`).should('exist');
      cy.findByText(newDeliveryAddress.country).should('exist');
      cy.findByText(newDeliveryAddress.phone).should('exist');
    });
  };
  checkData();
  cy.reload();
  checkData();
};

const goToUsedProductDetails = () => {
  cy.findAllByTestId('ProductItem').should('have.length.above', 0);
  cy.findByTestId('ProductList')
    .findByText(usedProduct.name)
    .closest('[data-testid="ProductItem"]')
    .click();
};

const addUsedProductToCart = () => {
  goToUsedProductDetails();
  cy.findByRole('button', { name: /add to cart/i }).click();
  cy.findByRole('button', { name: /go to cart/i }).click();
};

const updateProductQuantity = (newQuantity) => {
  cy.request('PATCH', `${Cypress.env('API_URL')}/testing/edit-product-quantity`, {
    name: usedProduct.name,
    newQuantity,
  });
};

describe('trading actions', () => {
  beforeEach(() => {
    cy.seedDb();
    cy.loginRequest(usedUser);
    cy.visit('/');
  });

  describe('entire proccess of buying and results of it', () => {
    it('adds item to cart with quantity: 2 * 5 and change data forever', () => {
      const quantityChosen = usedProduct.quantity / 2;
      const quantityBought = quantityChosen * 2;

      // choose given quantity by button clicks
      cy.findByText(usedProduct.name).closest('[data-testid="ProductItem"]').click();
      cy.findByText(`of ${usedProduct.quantity} pieces`).should('exist');
      for (let i = 0; i < quantityChosen - 1; i += 1) {
        cy.findByTestId('ChooseQuantity-plus-btn').click();
      }
      cy.findByTestId('NumberInput-quantity').should('have.value', quantityChosen);
      cy.findByTestId('CartLink-quantity').should('not.exist');
      // add to cart and check ui
      cy.findByRole('button', { name: /add to cart/ }).click();
      cy.findByText(
        `(total in the cart ${quantityChosen} x ${formatPrice(usedProduct.price)})`,
      ).should('exist');
      cy.findByRole('button', { name: /continue shopping/i }).click();
      cy.findByTestId('Modal').should('not.exist');
      cy.findByTestId('NumberInput-quantity').should('have.value', quantityChosen);
      cy.findByText(`(${quantityChosen} in cart)`).should('exist');
      cy.findByTestId('CartLink-quantity').should('have.text', 1);
      // reload and check ui
      cy.reload();
      cy.findByTestId('NumberInput-quantity').should('have.value', 1);
      cy.findByText(`(${quantityChosen} in cart)`).should('exist');
      cy.findByTestId('CartLink-quantity').should('have.text', 1);
      // choose given quantity, add to cart and go to cart
      cy.findByTestId('NumberInput-quantity').clear();
      cy.findByTestId('NumberInput-quantity').type(quantityChosen);
      cy.findByRole('button', { name: /add to cart/ }).click();
      cy.findByTestId('PurchaseSection-not-able-to-add').should('exist');
      cy.findByText(
        `(total in the cart ${quantityBought} x ${formatPrice(usedProduct.price)})`,
      ).should('exist');
      cy.findByRole('button', { name: /go to cart/i }).click();
      // check products in cart
      cy.checkHash('#/cart');
      cy.findByTestId('CartLink-quantity').should('have.text', 1);
      cy.findByTestId('CartAndTransactionItems-item-seller-link').should(
        'have.text',
        usedProduct.seller.username,
      );
      cy.findByTestId('CartItem').within(() => {
        cy.findByTestId('CartItem-product-link-name').should('have.text', usedProduct.name);
        cy.findByTestId('NumberInput-quantity').should('have.value', quantityBought);
        cy.findByTestId('CartItem-total-price').should(
          'have.text',
          formatPrice(quantityBought * usedProduct.price),
        );
        cy.findByTestId('CartItem-price-per-piece').should(
          'have.text',
          `per piece ${formatPrice(usedProduct.price)}`,
        );
      });
      // test links to seller and product
      cy.findByTestId('CartAndTransactionItems-item-seller-link').click();
      cy.checkHash(`#/user/${usedProduct.seller.username}?p=1`);
      cy.go('back');
      cy.findByTestId('CartItem-product-link-name').click();
      cy.checkHash('#/product/', 'contains');
      cy.go('back');
      cy.findByTestId('CartItem-product-link-photo').click();
      cy.checkHash('#/product/', 'contains');
      cy.go('back');
      // go to transaction and check data at transaction page
      cy.findByRole('button', { name: /go to summary/i }).click();
      cy.checkHash('#/transaction');
      cy.findByTestId('DeliveryAddressSection').within(() => {
        cy.findByText(`${usedUser.firstName} ${usedUser.lastName}`).should('exist');
        cy.findByText(usedUser.street).should('exist');
        cy.findByText(`${usedUser.zipCode} ${usedUser.city}`).should('exist');
        cy.findByText(usedUser.country).should('exist');
        cy.findByText(usedUser.phone).should('exist');
      });
      cy.findByTestId('CartAndTransactionItems-item-seller-link').should(
        'have.text',
        usedProduct.seller.username,
      );
      checkTransactionOrOrderProdItems(quantityBought);
      // change delivery address
      cy.findByRole('button', { name: /change address/i }).click();
      fillDeliveryAddressForm(newDeliveryAddress);
      cy.submitForm();
      cy.findByTestId('Modal').should('not.exist');
      // buy
      cy.findByRole('button', { name: /i buy and pay/i }).click();
      cy.findByTestId(`Modal-${modalTypes.BUY_PRODUCTS}`).should('exist');
      cy.findByRole('button', { name: /confirm/i }).click();
      // check placed orders and cart link
      cy.findByTestId('CartLink-quantity').should('not.exist');
      cy.checkHash('#/my-account/placed-orders?p=1');
      cy.findByTestId('OrderList-user-link').should('have.text', usedProduct.seller.username);
      checkTransactionOrOrderProdItems(quantityBought);
      // check order details and user and product links
      cy.findByRole('button', { name: /details/i }).click();
      cy.checkHash('#/order/', 'contains');
      checkDeliveryAddressInOrderDetails();
      checkTransactionOrOrderProdItems(quantityBought);
      cy.findByTestId('OrderDetails-buyer-link').click();
      cy.checkHash(`#/my-account/data`);
      cy.go('back');
      cy.findByTestId('OrderDetails-seller-link').click();
      cy.checkHash(`#/user/${usedProduct.seller.username}?p=1`);
      cy.go('back');
      // check delivery address data at /my-account/data
      cy.visit('/my-account/data');
      checkDeliveryAddressInAccountData(newDeliveryAddress);
      // check cart and go to default page
      cy.findByTestId('CartLink').click();
      cy.findByTestId('Cart-empty-cart').should('exist');
      // check offers at default page
      cy.findByTestId('Navbar-header-link').click();
      cy.findAllByTestId('ProductItem').should('have.length', 0);
      // visit transaction and automatically go to default page
      cy.visit('/transaction');
      cy.checkHash('#/cart');
    });

    it('adds item to cart with quantity: 1 and change data only for current order', () => {
      const quantityBought = 1;

      // click buy now and go to transaction
      cy.findByText(usedProduct.name).closest('[data-testid="ProductItem"]').click();
      cy.findByRole('button', { name: /buy now/ }).click();
      cy.findByTestId('CartLink-quantity').should('not.exist');
      // check transaction data
      cy.checkHash('#/transaction');
      cy.findByTestId('CartAndTransactionItems-item-seller-link').should(
        'have.text',
        usedProduct.seller.username,
      );
      checkTransactionOrOrderProdItems(quantityBought);
      // change delivery address
      cy.findByRole('button', { name: /change address/i }).click();
      fillDeliveryAddressForm(newDeliveryAddress);
      cy.findByTestId('ChangeDeliveryAddress-only-current-orders').click({ force: true });
      cy.submitForm();
      cy.findByTestId('Modal').should('not.exist');
      // buy
      cy.findByRole('button', { name: /i buy and pay/i }).click();
      cy.findByTestId(`Modal-${modalTypes.BUY_PRODUCTS}`).should('exist');
      cy.findByRole('button', { name: /confirm/i }).click();
      // placed orders
      cy.checkHash('#/my-account/placed-orders?p=1');
      cy.findByTestId('OrderList-user-link').should('have.text', usedProduct.seller.username);
      checkTransactionOrOrderProdItems(quantityBought);
      // order details
      cy.findByRole('button', { name: /details/i }).click();
      cy.checkHash('#/order/', 'contains');
      checkDeliveryAddressInOrderDetails();
      checkTransactionOrOrderProdItems(quantityBought);
      // check delivery address data at /my-account/data
      cy.visit('/my-account/data');
      checkDeliveryAddressInAccountData(usedUser);
      // check bought product data
      cy.findByTestId('Navbar-header-link').click();
      cy.findByText(usedProduct.name)
        .closest('[data-testid="ProductItem"]')
        .findByText('1 person bought');
      cy.findByText(usedProduct.name).closest('[data-testid="ProductItem"]').click();
      cy.findByText(`of ${usedProduct.quantity - quantityBought} pieces`).should('exist');
      cy.findByText(`1 person bought ${quantityBought} unit`).should('exist');
      // visit transaction and automatically go to cart
      cy.visit('/transaction');
      cy.checkHash('#/cart');
    });
  });

  describe('test ChooseQuantity in product details and in cart', () => {
    it('does not decrease below 1 and does not increase above product quantity in product details', () => {
      cy.findAllByTestId('ProductItem').should('have.length.above', 0);
      cy.findByTestId('ProductList')
        .findByText(usedProduct.name)
        .closest('[data-testid="ProductItem"]')
        .click();
      cy.findByTestId('NumberInput-quantity').should('have.value', 1);
      cy.findByTestId('NumberInput-quantity').clear();
      cy.findByTestId('NumberInput-quantity').should('have.value', '');
      cy.findByTestId('NumberInput-quantity').type(`${usedProduct.quantity}{enter}`);
      cy.findByTestId('NumberInput-quantity').should('have.value', usedProduct.quantity);
      cy.findByTestId('ChooseQuantity-plus-btn').click({ force: true });
      cy.findByTestId('NumberInput-quantity').should('have.value', usedProduct.quantity);
      cy.findByTestId('NumberInput-quantity').clear();
      cy.findByTestId('NumberInput-quantity').type('1{enter}');
      cy.findByTestId('ChooseQuantity-minus-btn').click({ force: true });
      cy.findByTestId('NumberInput-quantity').should('have.value', 1);
      cy.findByTestId('NumberInput-quantity').clear();
      cy.findByTestId('NumberInput-quantity').type('1000{enter}');
      cy.findByTestId('NumberInput-quantity').should('have.value', usedProduct.quantity);
      cy.findByTestId('NumberInput-quantity').clear();
      cy.findByTestId('NumberInput-quantity').type('9999{enter}');
      cy.findByTestId('NumberInput-quantity').should('have.value', 9);
      cy.findByTestId('ChooseQuantity-plus-btn').click();
      cy.findByTestId('NumberInput-quantity').should('have.value', usedProduct.quantity);
      for (let i = 0; i < 9; i += 1) {
        cy.findByTestId('ChooseQuantity-minus-btn').click();
      }
      cy.findByTestId('NumberInput-quantity').should('have.value', 1);
    });

    it('does not decrease below 1 and does not increase above product quantity in cart', () => {
      addUsedProductToCart();
      cy.findAllByTestId('CartItem').should('have.length', 1);
      cy.findByTestId('NumberInput-quantity').should('have.value', 1);
      cy.findByTestId('CartItem-total-price').should('have.text', formatPrice(usedProduct.price));
      cy.findByTestId('NumberInput-quantity').clear();
      cy.findByTestId('NumberInput-quantity').should('have.value', '');
      cy.findByTestId('NumberInput-quantity').type(`${usedProduct.quantity}{enter}`);
      cy.findByTestId('NumberInput-quantity').should('have.value', usedProduct.quantity);
      cy.findByTestId('CartItem-total-price').should(
        'have.text',
        formatPrice(usedProduct.price * usedProduct.quantity),
      );
      cy.findByTestId('ChooseQuantity-plus-btn').click({ force: true });
      cy.findByTestId('NumberInput-quantity').should('have.value', usedProduct.quantity);
      cy.findByTestId('NumberInput-quantity').clear();
      cy.findByTestId('NumberInput-quantity').type('1{enter}');
      cy.findByTestId('CartItem-total-price').should('have.text', formatPrice(usedProduct.price));
      cy.findByTestId('ChooseQuantity-minus-btn').click({ force: true });
      cy.findByTestId('NumberInput-quantity').should('have.value', 1);
      cy.findByTestId('NumberInput-quantity').clear();
      cy.findByTestId('NumberInput-quantity').type('1000{enter}');
      cy.findByTestId('NumberInput-quantity').should('have.value', usedProduct.quantity);
      cy.findByTestId('CartItem-total-price').should(
        'have.text',
        formatPrice(usedProduct.price * usedProduct.quantity),
      );
      cy.findByTestId('NumberInput-quantity').clear();
      cy.findByTestId('NumberInput-quantity').type('9999{enter}');
      cy.findByTestId('NumberInput-quantity').should('have.value', 9);
      cy.findByTestId('CartItem-total-price').should(
        'have.text',
        formatPrice(usedProduct.price * 9),
      );
      cy.findByTestId('ChooseQuantity-plus-btn').click();
      cy.findByTestId('NumberInput-quantity').should('have.value', usedProduct.quantity);
      cy.findByTestId('CartItem-total-price').should(
        'have.text',
        formatPrice(usedProduct.price * usedProduct.quantity),
      );
      for (let i = 1; i <= 9; i += 1) {
        cy.findByTestId('ChooseQuantity-minus-btn').click();
        cy.findByTestId('CartItem-total-price').should(
          'have.text',
          formatPrice(usedProduct.price * (usedProduct.quantity - i)),
        );
      }
      cy.findByTestId('NumberInput-quantity').should('have.value', 1);
      cy.findByTestId('CartItem-total-price').should('have.text', formatPrice(usedProduct.price));
    });
  });

  describe('removing items from cart', () => {
    it('removes item with trash icon', () => {
      addUsedProductToCart();
      cy.findAllByTestId('CartItem').should('have.length', 1);
      cy.findByTestId('CartItem-trash-icon').click();
      cy.findAllByTestId('CartItem').should('have.length', 0);
      cy.findByTestId('Cart-empty-cart').should('exist');
    });

    it('clears cart with button', () => {
      addUsedProductToCart();
      cy.findAllByTestId('CartItem').should('have.length', 1);
      cy.findByRole('button', { name: /clear the cart/i }).click();
      cy.findByTestId(`Modal-${modalTypes.CLEAR_CART}`)
        .findByRole('button', { name: /clear/i })
        .click();
      cy.findByTestId('Modal').should('not.exist');
      cy.findAllByTestId('CartItem').should('have.length', 0);
      cy.findByTestId('Cart-empty-cart').should('exist');
    });
  });

  describe('behaviour when product does not exist or its quantity is lower than chosen', () => {
    describe('adding to cart and go to transaction from product details page', () => {
      it('adds product to cart with updated quantity', () => {
        const newQuantity = usedProduct.quantity - 1;
        goToUsedProductDetails();
        cy.findByRole('button', { name: /add to cart/i }).should('exist');
        updateProductQuantity(newQuantity);
        cy.findByTestId('NumberInput-quantity').clear();
        cy.findByTestId('NumberInput-quantity').type(`${usedProduct.quantity}{enter}`);
        cy.findByRole('button', { name: /add to cart/i }).click();
        cy.findByTestId('MessageBox').should('exist');
        cy.findByText(
          `(total in the cart ${newQuantity} x ${formatPrice(usedProduct.price)})`,
        ).should('exist');
      });

      it('shows message when product does not exist and user wants to add it to cart', () => {
        goToUsedProductDetails();
        cy.findByRole('button', { name: /add to cart/i }).should('exist');
        updateProductQuantity(0);
        cy.findByRole('button', { name: /add to cart/i }).click();
        cy.findByTestId('MessageBox').should('exist');
        cy.findByTestId('Modal').should('not.exist');
        cy.checkHash('#/product/', 'contains');
        cy.reload();
        cy.findByRole('heading', {
          name: 'Such product does not exist or has already been sold',
        }).should('exist');
      });

      it('shows message and product with updated quantity after going to transaction', () => {
        const newQuantity = usedProduct.quantity - 1;
        goToUsedProductDetails();
        cy.findByRole('button', { name: /buy now/i }).should('exist');
        updateProductQuantity(newQuantity);
        cy.findByTestId('NumberInput-quantity').clear();
        cy.findByTestId('NumberInput-quantity').type(`${usedProduct.quantity}{enter}`);
        cy.findByRole('button', { name: /buy now/i }).click();
        cy.findByTestId('MessageBox').should('exist');
        cy.checkHash('#/transaction');
        cy.findAllByTestId('TransactionAndOrderProdItem').should('have.length', 1);
        cy.findByTestId('TransactionAndOrderProdItem-product-link-name').should(
          'have.text',
          usedProduct.name,
        );
        cy.findByTestId('TransactionAndOrderProdItem-product-price-per-piece').should(
          'have.text',
          `${newQuantity} x ${formatPrice(usedProduct.price)}`,
        );
      });

      it('shows message and go to previous page when product does not exist and user wants to buy it', () => {
        goToUsedProductDetails();
        cy.findByRole('button', { name: /buy now/i }).should('exist');
        updateProductQuantity(0);
        cy.findByRole('button', { name: /buy now/i }).click();
        cy.findByTestId('MessageBox').should('exist');
        cy.checkHash();
      });
    });

    describe('finalizing transaction', () => {
      it('updates product quantity, shows message and closes modal when quantity is lower than chosen', () => {
        const newQuantity = usedProduct.quantity - 1;
        goToUsedProductDetails();
        cy.findByTestId('NumberInput-quantity').clear();
        cy.findByTestId('NumberInput-quantity').type(`${usedProduct.quantity}{enter}`);
        cy.findByRole('button', { name: /buy now/i }).click();
        cy.findAllByTestId('TransactionAndOrderProdItem').should('have.length', 1);
        cy.findByTestId('TransactionAndOrderProdItem-product-price-per-piece').should(
          'have.text',
          `${usedProduct.quantity} x ${formatPrice(usedProduct.price)}`,
        );
        updateProductQuantity(newQuantity);
        cy.findByRole('button', { name: /i buy and pay/i }).click();
        cy.findByRole('button', { name: /confirm/i }).click();
        cy.findByTestId('Modal').should('not.exist');
        cy.findByTestId('MessageBox').should('exist');
        cy.findAllByTestId('TransactionAndOrderProdItem').should('have.length', 1);
        cy.findByTestId('TransactionAndOrderProdItem-product-price-per-piece').should(
          'have.text',
          `${newQuantity} x ${formatPrice(usedProduct.price)}`,
        );
        cy.visit('/my-account/placed-orders');
        cy.findByRole('heading', { name: `You don't have any placed orders yet` }).should('exist');
      });

      it('shows message and goes to cart when product does not exist', () => {
        goToUsedProductDetails();
        cy.findByRole('button', { name: /buy now/i }).click();
        cy.findByRole('button', { name: /i buy and pay/i }).should('exist');
        updateProductQuantity(0);
        cy.findByRole('button', { name: /i buy and pay/i }).click();
        cy.findByRole('button', { name: /confirm/i }).click();
        cy.findByTestId('MessageBox').should('exist');
        cy.checkHash('#/cart');
        cy.visit('/my-account/placed-orders');
        cy.findByRole('heading', { name: `You don't have any placed orders yet` }).should('exist');
      });
    });
  });
});

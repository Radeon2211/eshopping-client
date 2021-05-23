import '@testing-library/cypress/add-commands';
import { pendingUser } from '../fixtures/users';
import { productOne, allProducts } from '../fixtures/products';
import { formatPrice } from '../../src/shared/utility/utility';
import { productConditions } from '../../src/shared/constants';

const newProduct = allProducts.find(({ condition }) => condition === productConditions.NEW);
const usedProduct = allProducts.find(({ condition }) => condition === productConditions.USED);
const notApplicableProduct = allProducts.find(
  ({ condition }) => condition === productConditions.NOT_APPLICABLE,
);
const productsAscendingByPrice = [...allProducts].sort((a, b) => a.price - b.price);
const productsDescendingByPrice = [...allProducts].sort((a, b) => b.price - a.price);
const productsAscendingByName = [...allProducts].sort((a, b) => a.name.localeCompare(b.name));
const productsDescendingByName = [...allProducts].sort((a, b) => b.name.localeCompare(a.name));

const usedUser = pendingUser;

const submitFiltersForm = () => {
  cy.findByRole('button', { name: /filter/i }).click();
  cy.findByTestId('LoadingOverlay').should('not.exist');
};

const openSortingField = () => {
  cy.findByText(/default sorting/i).click();
};

const checkProductsOrder = (products) => {
  cy.findByTestId('ProductList').within(() => {
    cy.findAllByTestId('ProductItem').eq(0).findByText(products[0].name).should('exist');
    cy.findAllByTestId('ProductItem')
      .eq(products.length - 1)
      .findByText(products[products.length - 1].name)
      .should('exist');
  });
};

const checkResultsOfPriceSliderChanges = (minPrice, maxPrice) => {
  cy.findByTestId('NumberInput-minPrice').then(($input) => {
    expect(Number($input.val())).to.be.below(minPrice + 0.2);
    expect(Number($input.val())).to.be.above(minPrice - 0.2);
  });
  cy.findByTestId('NumberInput-maxPrice').then(($input) => {
    expect(Number($input.val())).to.be.below(maxPrice + 0.2);
    expect(Number($input.val())).to.be.above(maxPrice - 0.2);
  });
  cy.findByTestId('PriceSlider-price-range-min').then(($input) => {
    expect(Number($input.val())).to.be.below(minPrice + 0.2);
    expect(Number($input.val())).to.be.above(minPrice - 0.2);
  });
  cy.findByTestId('PriceSlider-price-range-max').then(($input) => {
    expect(Number($input.val())).to.be.below(maxPrice + 0.2);
    expect(Number($input.val())).to.be.above(maxPrice - 0.2);
  });

  cy.findByTestId('ProductList').within(() => {
    cy.findAllByTestId('ProductItem').should('have.length', allProducts.length - 2);
    cy.findAllByTestId('ProductItem').each(($item) => {
      cy.wrap($item).within(() => {
        cy.findByText(productsAscendingByPrice[0].name).should('not.exist');
        cy.findByText(productsDescendingByPrice[0].name).should('not.exist');
      });
    });
  });
};

const changeProductsPerPage = (quantity) => {
  cy.get('#perPageQuantity').click();
  cy.findByTestId('ProductsPerPageController').findAllByText(quantity).eq(0).click();
  cy.findByTestId('ProductsPerPageController').findByText(quantity).should('exist');
};

const checkPaginationCurrentPage = (expectedPage) => {
  // scenario for products per page = 1
  cy.checkHash(`p=${expectedPage}`, 'contains');
  cy.findByTestId('ProductList').within(() => {
    cy.findAllByTestId('ProductItem').should('have.length', 1);
    cy.findByTestId('ProductItem')
      .findByText(allProducts[expectedPage - 1].name)
      .should('exist');
  });
  cy.findByTestId('NumberInput-page').should('have.value', expectedPage);
  cy.findByTestId(`NumberPagination-page${expectedPage}`).should('have.class', 'active');
  cy.findByTestId('InputPagination-number-of-pages').should('have.text', allProducts.length);
  cy.findByTestId('NumberPagination-number-of-pages').should('have.text', allProducts.length);
  cy.findByTestId('PaginationCounter').should(
    'have.text',
    `${expectedPage} - ${expectedPage} of ${allProducts.length} products`,
  );
  if (expectedPage <= 1) {
    cy.findByTestId('InputPagination-left-arrow').should('have.class', 'hide-arrow');
    cy.findByTestId('NumberPagination-left-arrow').should('have.class', 'hide-arrow');
  } else {
    cy.findByTestId('InputPagination-left-arrow').should('not.have.class', 'hide-arrow');
    cy.findByTestId('NumberPagination-left-arrow').should('not.have.class', 'hide-arrow');
  }
  if (expectedPage >= allProducts.length) {
    cy.findByTestId('InputPagination-right-arrow').should('have.class', 'hide-arrow');
    cy.findByTestId('NumberPagination-right-arrow').should('have.class', 'hide-arrow');
  } else {
    cy.findByTestId('InputPagination-right-arrow').should('not.have.class', 'hide-arrow');
    cy.findByTestId('NumberPagination-right-arrow').should('not.have.class', 'hide-arrow');
  }
};

describe('product list and filters', () => {
  beforeEach(() => {
    cy.seedDb();
    cy.loginRequest(usedUser);
    cy.visit('/');
  });

  it('renders all products', () => {
    cy.findAllByTestId('ProductItem').each(($item, idx) => {
      const product = allProducts[idx];
      cy.wrap($item).within(() => {
        cy.findByText(product.name).should('exist');
        cy.findByText(formatPrice(product.price)).should('exist');
        if (product.condition !== productConditions.NOT_APPLICABLE) {
          cy.findByTestId('ProductItem-condition').should(
            'have.text',
            `Condition: ${product.condition.slice(0, 1).toUpperCase()}${product.condition.slice(
              1,
            )}`,
          );
        } else {
          cy.findByTestId('ProductItem-condition').should('not.exist');
        }
        if (product.buyerQuantity >= 1) {
          cy.findByText(
            product.buyerQuantity === 1
              ? '1 person bought'
              : `${product.buyerQuantity} people bought`,
          );
        } else {
          cy.findByTestId('ProductItem-buyer-quantity').should('not.exist');
        }
      });
    });
  });

  describe('condition filter', () => {
    it('renders new product', () => {
      cy.findByTestId('Filters-checkbox-new').click({ force: true });
      submitFiltersForm();
      cy.checkHash(`condition=${productConditions.NEW}`, 'contains');
      cy.checkHash(`minPrice=${productsAscendingByPrice[0].price}`, 'contains');
      cy.checkHash(`maxPrice=${productsDescendingByPrice[0].price}`, 'contains');
      cy.findAllByTestId('ProductItem').should('have.length', 1);
      cy.findByTestId('ProductItem').findByText(newProduct.name).should('exist');
    });

    it('renders used product', () => {
      cy.findByTestId('Filters-checkbox-used').click({ force: true });
      submitFiltersForm();
      cy.checkHash(`condition=${productConditions.USED}`, 'contains');
      cy.findAllByTestId('ProductItem').should('have.length', 1);
      cy.findByTestId('ProductItem').findByText(usedProduct.name).should('exist');
    });

    it('renders product with not applicable condition', () => {
      cy.findByTestId('Filters-checkbox-not-applicable').click({ force: true });
      submitFiltersForm();
      cy.checkHash(`condition=${productConditions.NOT_APPLICABLE}`, 'contains');
      cy.findAllByTestId('ProductItem').should('have.length', 1);
      cy.findByTestId('ProductItem').findByText(notApplicableProduct.name).should('exist');
    });

    it('renders new and used product', () => {
      cy.findByTestId('Filters-checkbox-new').click({ force: true });
      cy.findByTestId('Filters-checkbox-used').click({ force: true });
      submitFiltersForm();
      cy.findByTestId('ProductList').within(() => {
        cy.findAllByTestId('ProductItem').should('have.length', 2);
        cy.findByText(newProduct.name).should('exist');
        cy.findByText(usedProduct.name).should('exist');
      });
    });

    it('renders all products when all checkboxes are checked', () => {
      cy.findByTestId('Filters-checkbox-new').click({ force: true });
      cy.findByTestId('Filters-checkbox-used').click({ force: true });
      cy.findByTestId('Filters-checkbox-not-applicable').click({ force: true });
      submitFiltersForm();
      cy.findByTestId('ProductList').within(() => {
        cy.findAllByTestId('ProductItem').should('have.length', allProducts.length);
        cy.findByText(newProduct.name).should('exist');
        cy.findByText(usedProduct.name).should('exist');
        cy.findByText(notApplicableProduct.name).should('exist');
      });
    });
  });

  describe('sorting filter', () => {
    it('renders products ascending by price and then in default order', () => {
      openSortingField();
      cy.findByText(/price - ascending/i).click();
      submitFiltersForm();
      checkProductsOrder(productsAscendingByPrice);

      cy.findByText(/price - ascending/i).click();
      cy.findByText(/default sorting/i).click();
      submitFiltersForm();
      checkProductsOrder(allProducts);
    });

    it('renders products descending by price', () => {
      openSortingField();
      cy.findByText(/price - descending/i).click();
      submitFiltersForm();
      checkProductsOrder(productsDescendingByPrice);
    });

    it('renders products ascending by name', () => {
      openSortingField();
      cy.findByText(/name - a to z/i).click();
      submitFiltersForm();
      checkProductsOrder(productsAscendingByName);
    });

    it('renders products descending by name', () => {
      openSortingField();
      cy.findByText(/name - z to a/i).click();
      submitFiltersForm();
      checkProductsOrder(productsDescendingByName);
    });
  });

  describe('price filters', () => {
    it('does not render cheapest and most expensive product after price number inputs change', () => {
      const minPrice = Math.ceil(productsAscendingByPrice[0].price) + 1;
      const maxPrice = Math.floor(productsDescendingByPrice[0].price) - 1;
      cy.findByTestId('NumberInput-minPrice').clear().type(minPrice);
      cy.findByTestId('NumberInput-maxPrice').clear().type(maxPrice);
      submitFiltersForm();
      cy.checkHash(`minPrice=${minPrice}`, 'contains');
      cy.checkHash(`maxPrice=${maxPrice}`, 'contains');
      cy.findByTestId('NumberInput-minPrice').should('have.value', minPrice);
      cy.findByTestId('NumberInput-maxPrice').should('have.value', maxPrice);
      checkResultsOfPriceSliderChanges(minPrice, maxPrice);
    });

    it('does not render cheapest and most expensive product after price range inputs change', () => {
      const minPrice = Math.ceil(productsAscendingByPrice[0].price) + 10;
      const maxPrice = Math.floor(productsDescendingByPrice[0].price) - 10;
      cy.findByTestId('PriceSlider-price-range-min')
        .invoke('val', minPrice)
        .trigger('change', { force: true });
      cy.findByTestId('PriceSlider-price-range-max')
        .invoke('val', maxPrice)
        .trigger('change', { force: true });
      submitFiltersForm();
      checkResultsOfPriceSliderChanges(minPrice, maxPrice);
    });

    it('renders cheapest product only', () => {
      const price = Math.ceil(productsAscendingByPrice[0].price) + 10;
      cy.findByTestId('NumberInput-maxPrice').clear().type(price);
      cy.findByTestId('NumberInput-minPrice')
        .clear()
        .type(`${price + 1}{enter}`);
      cy.findByTestId('NumberInput-minPrice').should('have.value', price);
      submitFiltersForm();
      cy.findByTestId('NumberInput-minPrice').should(
        'have.value',
        productsAscendingByPrice[0].price,
      );
      cy.findAllByTestId('ProductItem').should('have.length', 1);
      cy.findByTestId('ProductItem').findByText(productsAscendingByPrice[0].name);
      cy.checkHash(`maxPrice=${price}`, 'contains');
    });
  });

  describe('filters combinations', () => {
    it('renders new product if condition is new and max price is lower than possible', () => {
      const maxPrice = Math.ceil(productsDescendingByPrice[0].price) - 10;
      cy.findByTestId('NumberInput-maxPrice').clear().type(maxPrice);
      cy.findByTestId('Filters-checkbox-new').click({ force: true });
      submitFiltersForm();
      cy.checkHash(`maxPrice=${maxPrice}`, 'contains');
      cy.checkHash(`condition=${productConditions.NEW}`, 'contains');
      cy.findAllByTestId('ProductItem').should('have.length', 1);
      cy.findByTestId('ProductItem').findByText(newProduct.name).should('exist');
    });

    it('does not render any product if condition is used and min price is almost like max price', () => {
      const minPrice = Math.ceil(productsDescendingByPrice[0].price) - 10;
      cy.findByTestId('NumberInput-minPrice').clear().type(minPrice);
      cy.findByTestId('Filters-checkbox-used').click({ force: true });
      submitFiltersForm();
      cy.checkHash(`minPrice=${minPrice}`, 'contains');
      cy.checkHash(`condition=${productConditions.USED}`, 'contains');
      cy.findAllByTestId('ProductItem').should('have.length', 0);
      cy.findByTestId('Filters').should('exist');
      cy.findByTestId('ProductList-empty-list-info').should('exist');
    });

    it('does not render cheapest and in ascending order by name', () => {
      const minPrice = Math.ceil(productsAscendingByPrice[0].price) + 10;
      cy.findByTestId('NumberInput-minPrice').clear().type(minPrice);
      openSortingField();
      cy.findByText(/name - a to z/i).click();
      submitFiltersForm();
      cy.findByTestId('Filters').should('exist');
      cy.findByTestId('ProductList').within(() => {
        cy.findAllByTestId('ProductItem').should('have.length', allProducts.length - 1);
        cy.findAllByTestId('ProductItem')
          .eq(0)
          .findByText(productsAscendingByName[0].name)
          .should('exist');
        cy.findAllByTestId('ProductItem').each(($item) => {
          cy.wrap($item).within(() => {
            cy.findByText(productsAscendingByPrice[0].name).should('not.exist');
          });
        });
      });
    });
  });

  describe('search form', () => {
    it('renders productOne only', () => {
      cy.findByTestId('SearchForm-input').type(productOne.name);
      cy.findByRole('button', { name: /search/i }).click();
      cy.findByRole('heading', { name: `Results for "${productOne.name}"` });
      cy.findAllByTestId('ProductItem').should('have.length', 1);
      cy.findByTestId('ProductItem').findByText(productOne.name).should('exist');
      cy.findByTestId('SearchForm-input').should('have.value', productOne.name);
    });

    it('renders all products', () => {
      const searchName = productOne.name.split(' ')[0];
      cy.findByTestId('SearchForm-input').type(searchName);
      cy.findByRole('button', { name: /search/i }).click();
      cy.findByTestId('SearchForm-input').should('have.value', searchName);
      cy.findByRole('heading', { name: `Results for "${searchName}"` });
      cy.findAllByTestId('ProductItem').should('have.length', 3);
    });

    it('does not render any product', () => {
      const searchName = 'randomcharacters';
      cy.findByTestId('SearchForm-input').type(`${searchName}{enter}`);
      cy.findByTestId('SearchForm-input').should('have.value', searchName);
      cy.findByRole('heading', { name: `Results for "${searchName}"` });
      cy.findByTestId('Filters').should('not.exist');
      cy.findAllByTestId('ProductItem').should('have.length', 0);
      cy.findByTestId('ProductList-empty-list-info').should('exist');
    });
  });

  describe('search form and filters', () => {
    it('renders productTwo and productThree in price ascending order', () => {
      const searchName = 'Product T';
      cy.findByTestId('SearchForm-input').type(`${searchName}{enter}`);
      cy.findByTestId('SearchForm-input').should('have.value', searchName);
      cy.findByRole('heading', { name: `Results for "${searchName}"` });
      openSortingField();
      cy.findByText(/price - ascending/i).click();
      submitFiltersForm();
      cy.findByTestId('ProductList').within(() => {
        cy.findAllByTestId('ProductItem').should('have.length', 2);
        cy.findByText(productOne.name).should('not.exist');
        cy.findAllByTestId('ProductItem')
          .eq(0)
          .findByText(productsAscendingByPrice[0].name)
          .should('exist');
        cy.findAllByTestId('ProductItem')
          .eq(1)
          .findByText(productsDescendingByPrice[0].name)
          .should('exist');
      });
    });

    it('does not render most expensive product', () => {
      const searchName = productOne.name.split(' ')[0];
      cy.findByTestId('SearchForm-input').type(`${searchName}{enter}`);
      cy.findByTestId('SearchForm-input').should('have.value', searchName);
      cy.findByRole('heading', { name: `Results for "${searchName}"` });
      cy.findByTestId('NumberInput-maxPrice')
        .clear()
        .type(Math.floor(productsDescendingByPrice[0].price) - 1);
      submitFiltersForm();
      cy.findByTestId('ProductList').within(() => {
        cy.findAllByTestId('ProductItem').should('have.length', allProducts.length - 1);
        cy.findByText(productsDescendingByPrice[0].name).should('not.exist');
      });
    });

    it('does not render any product', () => {
      const searchName = productOne.name;
      cy.findByTestId('SearchForm-input').type(`${searchName}{enter}`);
      cy.findByTestId('SearchForm-input').should('have.value', searchName);
      cy.findByRole('heading', { name: `Results for "${searchName}"` });
      cy.findByTestId('Filters-checkbox-used').click({ force: true });
      submitFiltersForm();
      cy.findAllByTestId('ProductItem').should('have.length', 0);
    });
  });

  describe('pagination', () => {
    it('renders default values', () => {
      cy.findByTestId('InputPagination-number-of-pages').should('have.text', 1);
      cy.findByTestId('NumberInput-page').should('have.value', 1);
      cy.findByTestId('NumberPagination-number-of-pages').should('have.text', 1);
      cy.findByTestId('PaginationCounter').should(
        'have.text',
        `1 - ${allProducts.length} of ${allProducts.length} products`,
      );
    });

    describe('ProductsPerPageController', () => {
      it('shows pages as many as products and renders 1 product per page and then change to 25', () => {
        changeProductsPerPage(1);
        checkPaginationCurrentPage(1);

        changeProductsPerPage(25);
        cy.findAllByTestId('ProductItem').should('have.length', allProducts.length);
        cy.findByTestId('NumberInput-page').should('have.value', 1);
        cy.findByTestId(`NumberPagination-page1`).should('have.class', 'active');
        cy.findByTestId('InputPagination-number-of-pages').should('have.text', 1);
        cy.findByTestId('NumberPagination-number-of-pages').should('have.text', 1);
        cy.findByTestId('PaginationCounter').should(
          'have.text',
          `1 - ${allProducts.length} of ${allProducts.length} products`,
        );
      });

      it('renders 2 products per page and show correct number of pages when products per page is set to 2', () => {
        changeProductsPerPage(2);
        const expectedNumberOfPages = Math.ceil(allProducts.length / 2);

        cy.findAllByTestId('ProductItem').should('have.length', 2);

        cy.findByTestId('InputPagination-number-of-pages').should(
          'have.text',
          expectedNumberOfPages,
        );
        cy.findByTestId('NumberInput-page').should('have.value', 1);
        cy.findByTestId('NumberPagination-number-of-pages').should(
          'have.text',
          expectedNumberOfPages,
        );

        cy.findByTestId('PaginationCounter').should(
          'have.text',
          `1 - 2 of ${allProducts.length} products`,
        );
      });
    });

    describe('InputPagination', () => {
      it('changes pages correctly', () => {
        changeProductsPerPage(1);
        cy.findByTestId('InputPagination-right-arrow').click();
        checkPaginationCurrentPage(2);
        cy.findByTestId('InputPagination-right-arrow').click();
        checkPaginationCurrentPage(3);
        cy.findByTestId('InputPagination-left-arrow').click();
        checkPaginationCurrentPage(2);
        cy.findByTestId('InputPagination-left-arrow').click();
        checkPaginationCurrentPage(1);
        cy.findByTestId('NumberInput-page').clear().type('9999{enter}');
        checkPaginationCurrentPage(allProducts.length);
        cy.findByTestId('NumberInput-page').clear().type('0{enter}');
        checkPaginationCurrentPage(1);
        cy.findByTestId('NumberInput-page').clear().type('2{enter}');
        checkPaginationCurrentPage(2);
      });
    });

    describe('NumberPagination', () => {
      it('changes pages correctly', () => {
        changeProductsPerPage(1);
        cy.findByTestId('NumberPagination-right-arrow').click();
        checkPaginationCurrentPage(2);
        cy.findByTestId('NumberPagination-right-arrow').click();
        checkPaginationCurrentPage(3);
        cy.findByTestId('NumberPagination-left-arrow').click();
        checkPaginationCurrentPage(2);
        cy.findByTestId('NumberPagination-left-arrow').click();
        checkPaginationCurrentPage(1);
        cy.findByTestId(`NumberPagination-page${allProducts.length}`).click();
        checkPaginationCurrentPage(allProducts.length);
        cy.findByTestId('NumberPagination-page1').click();
        checkPaginationCurrentPage(1);
        cy.findByTestId('NumberPagination-page2').click();
        checkPaginationCurrentPage(2);
      });
    });
  });
});

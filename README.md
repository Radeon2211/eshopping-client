# E-Shopping (Client)

### Frontend part of MERN E-Shopping app (backend is [here](https://github.com/Radeon2211/eshopping-api))

The application is used for selling and buying products.

#### Subpages:

- **/products** - product list with filters (default page)
- **/product/_product-id_** - product details with options: buy or add to cart (at this page owner can edit and delete product, admin can delete product only)
- **/user/_username_** - info about specific user with his products
- **/my-account/data** - settings of my account (at this page admin can add or remove other admins)
- **/my-account/products** - my product list
- **/my-account/sell-history** - list of orders placed with me
- **/my-account/placed-orders** - list of orders placed with other users
- **/cart** - my shopping cart
- **/transaction** - summary of order that I want to place with option to change delivery address

Only first 3 routes are available for unauthenticated user.

App is partially tested.

Next steps are:

- add the option to write a review of the purchased products
- add notifications when someone buy your product or write a review of your product

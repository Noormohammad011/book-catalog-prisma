# Build a Book Catalog Backend with Prisma

<hr>

### Live Link: https://book-catalog-prisma-two.vercel.app

### Application Routes:

#### User

- api/v1/auth/signup (POST)
- api/v1/auth/signin (POST)
- api/v1/auth/logout (POST)
- api/v1/auth/refresh-token (POST)
- api/v1/users (GET)
- api/v1/users/c2aaa628-736b-4784-ad4a-fea709052277 (Single GET) Include an id that is saved in my database
- api/v1/users/c2aaa628-736b-4784-ad4a-fea709052277 (PATCH)
- api/v1/users/c2aaa628-736b-4784-ad4a-fea709052277 (DELETE) Include an id that is saved in my database
- api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories/ (GET)
- api/v1/categories/c6d01007-0ee9-4223-abdd-046a02774ace (Single GET) Include an id that is saved in my database
- api/v1/categories/c6d01007-0ee9-4223-abdd-046a02774ace (PATCH)
- api/v1/categories/c6d01007-0ee9-4223-abdd-046a02774ace (DELETE) Include an id that is saved in my database

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/:categoryId/category (GET)
- api/v1/books/:id (GET)
- api/v1/books/:id (PATCH)
- api/v1/books/:id (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/:orderId (GET)

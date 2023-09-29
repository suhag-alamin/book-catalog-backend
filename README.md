## Book Catalog Backend

## Live Link: https://book-catallog-backend-lilac.vercel.app

### Application Routes:

### User

- api/v1/auth/signup (POST)

```
{
    "name": "Suhag Al Amin",
    "email": "suhag@example.com",
    "password": "123456",
    "role": "admin",
    "contactNo": "1234567890",
    "address": "Dhaka, Bangladesh",
    "profileImg": "user.jpg"
}
```

- api/v1/signin (POST)

```
{
    "email": "suhag@example.com",
    "password": "123456"
}
```

- api/v1/users (GET)
  - Authorization (admin)
- api/v1/users/3fae8a37-569f-475c-af68-b3504adeeb7d (Single GET)
  - Authorization (admin)
- api/v1/users/3fae8a37-569f-475c-af68-b3504adeeb7d (PATCH)
  - Authorization (admin)

```
{
    "name": "Jane"
}
```

- api/v1/users/3fae8a37-569f-475c-af68-b3504adeeb7d (DELETE)

  - Authorization (admin)

- api/v1/profile (GET)
  - Authorization (admin / customer)

### Category

- api/v1/categories/create-category (POST)
  - Authorization (admin)

```
{
  "title": "Programming"
}
```

- api/v1/categories (GET)
  - Authorization (admin)
- api/v1/categories/7c191fd8-ae8c-4199-b1e1-cb72bd4d2802 (Single GET) Include an id that is saved in your database
  - Authorization (admin)
- api/v1/categories/7c191fd8-ae8c-4199-b1e1-cb72bd4d2802 (PATCH)
  - Authorization (admin)

```
{
  "title": "Tech"
}
```

- api/v1/categories/7c191fd8-ae8c-4199-b1e1-cb72bd4d2802 (DELETE) Include an id that is saved in your database
  - Authorization (admin)

### Books

- api/v1/books/create-book (POST)
  - Authorization (admin)

```
{
    "title": "The Hobbit",
    "author": "John Ronald Reuel",
    "genre": "Action",
    "price": 1000.00,
    "publicationDate": "1937-07-16",
    "categoryId": "22fab336-3ffd-4427-8853-f4f5f1108a16"
}
```

- api/v1/books (GET)
  - Authorization (admin)

```
page: 1
limit:10
sortBy: price
sortOrder: desc
searchTerm: tech
minPrice: 200
maxPrice: 500
```

- api/v1/books/b842f587-a543-4fe2-a967-45cf7d74c174/category (GET)
  - Authorization (admin)
- api/v1/books/02538497-e5ac-45f7-9533-465e41e31b52 (GET)
  - Authorization (admin)
- api/v1/books/02538497-e5ac-45f7-9533-465e41e31b52 (PATCH)
  - Authorization (admin)

```
{
    "price": 1200.11
}
```

- api/v1/books/02538497-e5ac-45f7-9533-465e41e31b52 (DELETE)
  - Authorization (admin)

### Orders

- api/v1/orders/create-order (POST)
  - Authorization (customer)
- api/v1/orders (GET)
  - Authorization (admin / customer)
- api/v1/orders/2b1c8992-ef44-44b9-9c32-12a09fe7c870 (GET)
  - Authorization (admin / customer)

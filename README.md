# ShopAdmin – Product Dashboard & Cart System

A responsive e-commerce dashboard application built using React. This project includes user login, product listing, product details, cart management, checkout, order history, and profile pages.

## Features

- **Login:** Email and password validation with localStorage authentication.
- **Dashboard:** Overview of products, cart items, cart value, and orders.
- **Products:** Fetch products from DummyJSON API.
- **Search, Filter & Sort:** Search products by name, filter by category, and sort by price.
- **Product Details:** View individual product information.
- **Cart:** Add, remove, and update product quantities.
- **Checkout:** Customer information form with validation.
- **Orders:** View previously placed orders and order details.
- **Profile:** View logged-in user information.
- **Protected Routes:** Restrict access to application pages before login.

## Technologies Used

- React.js
- JavaScript
- HTML5
- CSS3
- React Router DOM
- Lucide React
- DummyJSON API
- Browser localStorage
- Vite

## Installation and Setup

1. Clone the repository: 

   ```bash
   git clone https://github.com/shubhambag777/react-product-dashboard-cart-system.git
   ```

2. Navigate to the project directory:

   ```bash
   cd test
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal.

## API Used

Product data is fetched from:

https://dummyjson.com/products

## Data Storage

Browser localStorage is used to store:
- Login information
- Cart items
- Placed orders

## Note

This is a frontend demonstration project. Authentication is simulated using localStorage; it does not use a backend authentication service or payment gateway.

## Author

Shubham Bag

## License

This project was created for learning and machine test purposes.
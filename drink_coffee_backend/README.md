# Drink Coffee - Rails Backend

This is the Ruby on Rails backend for the Drink Coffee online coffee shop application. It provides a RESTful API for the React frontend to interact with.

## Technology Stack

- Ruby 3.0.2
- Rails 7.1.5.1 (API mode)
- SQLite (Development) / PostgreSQL (Production-ready)
- JWT Authentication
- Rack-CORS for cross-origin requests

## Features

- User authentication (register, login, logout)
- Coffee menu management
- Shopping cart functionality
- Order processing and history

## API Endpoints

### Authentication

- `POST /api/v1/register` - Register a new user
- `POST /api/v1/login` - Login an existing user
- `DELETE /api/v1/logout` - Logout current user

### Coffee Menu

- `GET /api/v1/coffees` - Get all coffee items

### Shopping Cart

- `GET /api/v1/cart_items` - Get current user's cart items
- `POST /api/v1/cart_items` - Add item to cart
- `PUT /api/v1/cart_items/:id` - Update cart item quantity
- `DELETE /api/v1/cart_items/:id` - Remove item from cart

### Orders

- `GET /api/v1/orders` - Get user's order history
- `POST /api/v1/orders` - Create a new order from cart items

## Setup Instructions

### Prerequisites

- Ruby 3.0.2 or higher
- Bundler gem

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd drink_coffee_rails_backend
```

2. Install dependencies
```bash
bundle install
```

3. Set up the database
```bash
rails db:create
rails db:migrate
rails db:seed
```

4. Start the server
```bash
rails server -b 0.0.0.0 -p 3001
```

The API will be available at `http://localhost:3001`.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
JWT_SECRET_KEY=your_secure_jwt_secret_key_here
CORS_ORIGINS=http://localhost:5173
```

## Database Schema

### Users
- id: bigint
- username: string
- email: string
- password_digest: string
- created_at: datetime
- updated_at: datetime

### Coffees
- id: bigint
- name: string
- description: text
- price: decimal
- image_url: string
- created_at: datetime
- updated_at: datetime

### Cart Items
- id: bigint
- user_id: bigint (foreign key)
- coffee_id: bigint (foreign key)
- quantity: integer
- created_at: datetime
- updated_at: datetime

### Orders
- id: bigint
- user_id: bigint (foreign key)
- total: decimal
- status: string
- created_at: datetime
- updated_at: datetime

### Order Items
- id: bigint
- order_id: bigint (foreign key)
- coffee_id: bigint (foreign key)
- quantity: integer
- price: decimal
- created_at: datetime
- updated_at: datetime

## Testing

Run the test suite with:

```bash
rails test
```

## Deployment

This application is ready for deployment to platforms like Heroku:

```bash
heroku create
git push heroku main
heroku run rails db:migrate
heroku run rails db:seed
```

## License

This project is licensed under the MIT License.


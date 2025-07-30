# Mini Project BE User

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Run the project in development mode:
```bash
npm run dev
```

4. Run the project in production mode:
```bash
npm start
```

## Environment Configuration

Create a `.env` file in the root directory and configure the following environment variables:

- `PORT`: The port number on which the server will run (default is 3000).

Example `.env` file:
```
PORT=3000
```

## API Endpoints

All API endpoints are prefixed with `/api`.

| Method | Endpoint  | Description              |
|--------|-----------|--------------------------|
| POST   | /api/signin | User sign in             |
| POST   | /api/signup | User sign up             |

Both endpoints expect a JSON body with authentication data (e.g., username and password) and return JSON responses.

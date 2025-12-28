# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication Endpoints

### Register User
Create a new user account

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (201 Created):**
```json
{
  "message": "User created successfully",
  "userId": "clx1234567890abcdef"
}
```

**Error Response (400/409):**
```json
{
  "error": "Email and password are required"
}
```

### Login User
Authenticate user with credentials

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "userId": "clx1234567890abcdef",
  "email": "user@example.com"
}
```

**Error Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

## Deposit Endpoints

### Create Deposit
Initiate a deposit transaction

**Endpoint:** `POST /deposits`

**Request Body:**
```json
{
  "userId": "clx1234567890abcdef",
  "amount": 1.5,
  "token": "ETH",
  "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
}
```

**Response (201 Created):**
```json
{
  "id": "clx9876543210fedcba",
  "userId": "clx1234567890abcdef",
  "amount": 1.5,
  "token": "ETH",
  "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "status": "pending",
  "createdAt": "2024-12-28T12:00:00Z"
}
```

### Get User Deposits
Retrieve all deposits for a user

**Endpoint:** `GET /deposits?userId={userId}`

**Query Parameters:**
- `userId` (required): The user's ID

**Response (200 OK):**
```json
[
  {
    "id": "clx9876543210fedcba",
    "userId": "clx1234567890abcdef",
    "amount": 1.5,
    "token": "ETH",
    "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    "status": "pending",
    "createdAt": "2024-12-28T12:00:00Z"
  }
]
```

## Withdrawal Endpoints

### Create Withdrawal
Initiate a withdrawal transaction

**Endpoint:** `POST /withdrawals`

**Request Body:**
```json
{
  "userId": "clx1234567890abcdef",
  "amount": 0.5,
  "token": "ETH",
  "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
}
```

**Response (201 Created):**
```json
{
  "id": "clx5555555555555555",
  "userId": "clx1234567890abcdef",
  "amount": 0.5,
  "token": "ETH",
  "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "status": "pending",
  "createdAt": "2024-12-28T12:30:00Z"
}
```

### Get User Withdrawals
Retrieve all withdrawals for a user

**Endpoint:** `GET /withdrawals?userId={userId}`

**Query Parameters:**
- `userId` (required): The user's ID

**Response (200 OK):**
```json
[
  {
    "id": "clx5555555555555555",
    "userId": "clx1234567890abcdef",
    "amount": 0.5,
    "token": "ETH",
    "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    "status": "pending",
    "createdAt": "2024-12-28T12:30:00Z"
  }
]
```

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200`: Success
- `201`: Resource created
- `400`: Bad request (missing/invalid parameters)
- `401`: Unauthorized (invalid credentials)
- `409`: Conflict (duplicate email)
- `500`: Server error

**Error Response Format:**
```json
{
  "error": "Description of what went wrong"
}
```

## Rate Limiting

Currently no rate limiting is implemented. This is planned for production.

## Pagination

Deposit and withdrawal endpoints do not currently support pagination. All records are returned.

Future implementation will include:
- `limit` parameter (default: 20)
- `offset` parameter (default: 0)
- `page` parameter (default: 1)

## Sorting

Results are returned in reverse chronological order (newest first) by default.

## Example Usage

### Complete Flow with cURL

```bash
# 1. Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"secure123"}'

# Save the returned userId

# 2. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"secure123"}'

# 3. Create deposit
curl -X POST http://localhost:3000/api/deposits \
  -H "Content-Type: application/json" \
  -d '{"userId":"[userId]","amount":2.0,"token":"ETH","txHash":"0xabc123"}'

# 4. Get deposits
curl "http://localhost:3000/api/deposits?userId=[userId]"

# 5. Create withdrawal
curl -X POST http://localhost:3000/api/withdrawals \
  -H "Content-Type: application/json" \
  -d '{"userId":"[userId]","amount":1.0,"token":"ETH","txHash":"0xdef456"}'

# 6. Get withdrawals
curl "http://localhost:3000/api/withdrawals?userId=[userId]"
```

## Webhooks

Webhooks are planned for future releases to notify external services of transaction status updates.

## Versioning

API version 1.0 (v1) - Released 2024-12-28

Future versions may introduce breaking changes with proper deprecation notices.

---

For more information, see [README.md](README.md) or [CONTRIBUTING.md](CONTRIBUTING.md)

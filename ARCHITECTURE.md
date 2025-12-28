# Architecture Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend Layer                        │
│  ┌──────────────────────────────────────────────────┐   │
│  │ React Components (Next.js App Router)            │   │
│  │ - Dashboard.tsx, WalletConnect.tsx               │   │
│  │ - Responsive UI with Tailwind CSS                │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Web3 Context (ethers.js)                         │   │
│  │ - Wallet connection management                   │   │
│  │ - Balance tracking                               │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTP/REST
                          │
┌─────────────────────────────────────────────────────────┐
│                    API Layer                            │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Next.js API Routes                               │   │
│  │ - /api/auth/register                             │   │
│  │ - /api/auth/login                                │   │
│  │ - /api/deposits                                  │   │
│  │ - /api/withdrawals                               │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Business Logic                                    │   │
│  │ - Authentication & authorization                 │   │
│  │ - Password hashing (bcryptjs)                    │   │
│  │ - Transaction validation                         │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          │
                          │ SQL
                          │
┌─────────────────────────────────────────────────────────┐
│                   Data Layer                            │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Prisma ORM                                       │   │
│  │ - Database abstraction layer                     │   │
│  │ - Type-safe queries                              │   │
│  │ - Migrations                                     │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ PostgreSQL Database                              │   │
│  │ - Users, Sessions, Deposits, Withdrawals        │   │
│  │ - Transaction history                            │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          │
                          │
┌─────────────────────────────────────────────────────────┐
│              External Services                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Blockchain (Base Network)                        │   │
│  │ - Transaction broadcasting                       │   │
│  │ - Balance queries                                │   │
│  │ - Smart contract interaction                     │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## File Structure & Responsibilities

```
base-defi-bank/
├── app/
│   ├── api/                    # API Routes
│   │   ├── auth/
│   │   │   ├── register/      # User registration
│   │   │   └── login/         # User authentication
│   │   ├── deposits/          # Deposit management
│   │   └── withdrawals/       # Withdrawal management
│   ├── layout.tsx             # Root layout with Web3Provider
│   ├── page.tsx               # Home page with Dashboard
│   └── globals.css            # Global styles
│
├── components/                # React Components
│   ├── Dashboard.tsx          # Main dashboard UI
│   └── WalletConnect.tsx      # Wallet connection button
│
├── contexts/                  # React Contexts
│   └── Web3Context.tsx        # Web3 state management
│
├── lib/                       # Utilities & Helpers
│   └── auth.ts               # Password hashing/verification
│
├── prisma/                    # Database
│   └── schema.prisma         # Database schema & models
│
├── __tests__/                # Unit Tests
│   ├── components/
│   │   └── Dashboard.test.tsx
│   └── api/
│       └── auth.test.ts
│
├── cypress/                   # E2E Tests
│   └── e2e/
│       └── dashboard.cy.ts
│
├── .github/
│   └── workflows/
│       └── ci.yml            # CI/CD pipeline
│
├── jest.config.ts            # Jest configuration
├── jest.setup.ts             # Jest setup
└── cypress.config.ts         # Cypress configuration
```

## Data Models

### User
```typescript
{
  id: string              // Unique identifier
  email: string          // Unique email
  password: string       // Hashed password
  wallet?: string        // Optional blockchain wallet
  createdAt: DateTime
  updatedAt: DateTime
  accounts: Account[]    // Related OAuth accounts
  sessions: Session[]    // Active sessions
  deposits: Deposit[]    // User's deposits
  withdrawals: Withdrawal[] // User's withdrawals
}
```

### Deposit
```typescript
{
  id: string            // Unique identifier
  userId: string        // Reference to User
  amount: number        // Amount in ETH/tokens
  token: string         // Token type (ETH, USDC, etc)
  txHash: string        // Blockchain transaction hash
  status: string        // pending | confirmed | failed
  createdAt: DateTime
  user: User
}
```

### Withdrawal
```typescript
{
  id: string            // Unique identifier
  userId: string        // Reference to User
  amount: number        // Amount to withdraw
  token: string         // Token type
  txHash: string        // Blockchain transaction hash
  status: string        // pending | confirmed | failed
  createdAt: DateTime
  user: User
}
```

## Authentication Flow

```
┌──────────────┐
│   User       │
└──────┬───────┘
       │
       │ 1. Submit email & password
       ▼
┌──────────────────────────┐
│ Register/Login Form      │
└──────┬───────────────────┘
       │
       │ 2. POST /api/auth/register or /api/auth/login
       ▼
┌──────────────────────────┐
│ API Route                │
│ - Validate input         │
│ - Hash/verify password   │
│ - Create/find user       │
└──────┬───────────────────┘
       │
       │ 3. Query database
       ▼
┌──────────────────────────┐
│ Prisma ORM               │
│ - User model operations  │
└──────┬───────────────────┘
       │
       │ 4. Response with userId
       ▼
┌──────────────────────────┐
│ Client (localStorage)    │
│ - Store user info        │
│ - Set session            │
└──────────────────────────┘
```

## Deposit Flow

```
┌──────────────────────┐
│ User Input           │
│ - Amount             │
│ - Token              │
└──────┬───────────────┘
       │
       │ 1. Connect wallet & send transaction
       ▼
┌──────────────────────────┐
│ Web3Context              │
│ - ethers.js              │
│ - MetaMask integration   │
└──────┬───────────────────┘
       │
       │ 2. Transaction to blockchain
       ▼
┌──────────────────────────┐
│ Base Network             │
│ - Confirm transaction    │
│ - Return txHash          │
└──────┬───────────────────┘
       │
       │ 3. Save deposit record
       ▼
┌──────────────────────────┐
│ POST /api/deposits       │
│ - Create record          │
│ - Update balance         │
└──────┬───────────────────┘
       │
       │ 4. Persist to database
       ▼
┌──────────────────────────┐
│ PostgreSQL               │
│ - Deposit entry          │
│ - Transaction history    │
└──────────────────────────┘
```

## Testing Strategy

### Unit Tests (Jest)
- Component rendering
- Function logic
- Password hashing/verification
- API route validation

### E2E Tests (Cypress)
- User registration flow
- Wallet connection
- Deposit/withdrawal UI
- Dashboard functionality

### Coverage Goals
- 80% minimum coverage
- 100% coverage for critical paths (auth, transfers)
- Focus on business logic

## State Management

### Web3Context
Manages blockchain-related state:
- Connected wallet address
- Provider instance
- Signer instance
- ETH balance
- Connection status

### React State
Component-level state:
- Form inputs (deposit amount, withdrawal amount)
- Loading states
- Error messages

### Database State
Persistent state in PostgreSQL:
- User accounts
- Transaction history
- Session data

## Performance Optimizations

1. **Code Splitting**
   - Next.js automatic route-based splitting
   - Lazy loading of Cypress bundle

2. **Component Optimization**
   - React.memo for expensive components
   - useMemo for computed values

3. **Database**
   - Indexed queries on userId
   - Connection pooling via Prisma

4. **Caching**
   - Next.js ISR for static content
   - Browser caching headers

## Security Measures

1. **Authentication**
   - Bcrypt password hashing
   - NextAuth for session management

2. **API Security**
   - Input validation on all routes
   - Type-safe operations with TypeScript

3. **Database**
   - Prepared statements via Prisma
   - Protection against SQL injection

4. **Web3**
   - Only read-only operations in browser
   - No private key storage

## Deployment Architecture

```
┌─────────────────────┐
│ GitHub Repository   │
└──────┬──────────────┘
       │
       │ Push/PR
       ▼
┌─────────────────────┐
│ GitHub Actions      │ (CI/CD Pipeline)
│ - Lint              │
│ - Test              │
│ - Build             │
│ - E2E               │
└──────┬──────────────┘
       │ Build successful
       ▼
┌─────────────────────┐
│ Vercel/Hosting      │
│ - Deploy            │
│ - CDN               │
│ - SSL/TLS           │
└─────────────────────┘
```

## Future Enhancements

1. **Smart Contracts**
   - Deposit/withdrawal contracts
   - Yield farming contracts

2. **Advanced Features**
   - Multi-chain support
   - Token swaps
   - Liquidity pools

3. **Scalability**
   - Caching layer (Redis)
   - Database replication
   - API rate limiting

4. **Monitoring**
   - Sentry error tracking
   - Analytics integration
   - Performance monitoring

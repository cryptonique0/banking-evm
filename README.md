# Base DeFi Bank 🏦

A decentralized finance banking application built with Next.js, React, and Web3 technologies. This application enables users to connect their wallets, deposit/withdraw funds, and manage their DeFi assets with a modern, intuitive interface.

## Features ✨

### 1. **Web3 Wallet Integration** 🔗
- MetaMask and browser wallet support via ethers.js
- Real-time wallet connection/disconnection
- Automatic balance tracking
- Account address display with checksum validation

### 2. **DeFi Dashboard** 📊
- Beautiful, responsive UI with glassmorphism design
- Real-time balance display
- Interactive charts (Balance History & Transaction Volume)
- Account statistics and overview
- Dark mode optimized

### 3. **Backend API** 🔐
- **Authentication**: User registration and login with bcrypt password hashing
- **Deposits**: Create and track ETH/token deposits
- **Withdrawals**: Manage fund withdrawals
- **User Management**: Secure user profiles with wallet integration
- RESTful API design

### 4. **Database** 💾
- PostgreSQL with Prisma ORM
- User, Account, Session, Deposit, Withdrawal models
- Transaction history tracking
- Automatic timestamps and cascading deletes

### 5. **Testing Suite** 🧪
- **Unit Tests**: Jest + React Testing Library
  - Dashboard component tests
  - Authentication utility tests
  - API route validation
- **E2E Tests**: Cypress
  - Dashboard load tests
  - Wallet connection flow
  - Form submission tests
- **Code Coverage**: Configured for comprehensive coverage reporting

### 6. **CI/CD Pipeline** 🚀
- GitHub Actions workflow
- Automated linting on push/PR
- Unit test execution
- Next.js build verification
- E2E test automation
- Artifact upload for builds

## Installation 📦

### Prerequisites
- Node.js 18+
- PostgreSQL database
- MetaMask or browser wallet extension

### Setup Steps

1. **Clone the repository**
```bash
git clone <repo-url>
cd base-defi-bank
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

Update `.env.local` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/defi_bank"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
INFURA_API_KEY="your-infura-key"
```

4. **Set up the database**
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts 📝

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run Jest unit tests
- `npm run lint` - Run ESLint
- `cypress open` - Open Cypress test runner
- `cypress run` - Run Cypress tests in headless mode

## Project Structure 📁

```
base-defi-bank/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/
│   │   │   └── login/
│   │   ├── deposits/
│   │   └── withdrawals/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Dashboard.tsx
│   └── WalletConnect.tsx
├── contexts/
│   └── Web3Context.tsx
├── lib/
│   └── auth.ts
├── prisma/
│   └── schema.prisma
├── __tests__/
│   ├── components/
│   └── api/
├── cypress/
│   └── e2e/
├── .github/
│   └── workflows/
│       └── ci.yml
├── jest.config.ts
├── jest.setup.ts
└── cypress.config.ts
```

## API Endpoints 🔌

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - User login

### Deposits
- `POST /api/deposits` - Create deposit
- `GET /api/deposits?userId=xxx` - Get user deposits

### Withdrawals
- `POST /api/withdrawals` - Create withdrawal
- `GET /api/withdrawals?userId=xxx` - Get user withdrawals

## API Examples

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Create Deposit
```bash
curl -X POST http://localhost:3000/api/deposits \
  -H "Content-Type: application/json" \
  -d '{"userId":"user-id","amount":1.5,"token":"ETH","txHash":"0x..."}'
```

## Tech Stack 🛠️

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4, PostCSS
- **Web3**: ethers.js 6, Web3.js
- **Backend**: Node.js API routes
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: bcryptjs
- **Charts**: Recharts
- **Testing**: Jest, React Testing Library, Cypress
- **CI/CD**: GitHub Actions
- **Linting**: ESLint

## Testing 🧪

### Run Unit Tests
```bash
npm test
```

### Run Unit Tests with Coverage
```bash
npm test -- --coverage
```

### Run E2E Tests (Headless)
```bash
npm run cypress:run
```

### Open Cypress Test Runner
```bash
npm run cypress:open
```

## Deployment 🚀

### Deploy to Vercel
The easiest way to deploy is with [Vercel](https://vercel.com):

```bash
npm i -g vercel
vercel
```

### Manual Deployment
1. Build the application: `npm run build`
2. Set environment variables on your hosting platform
3. Run the production server: `npm start`

## Git Workflow 📚

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: add your feature"

# Push to remote
git push origin feature/your-feature

# Create pull request on GitHub
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Support 💬

For support, email support@defibankapp.com or open an issue on GitHub.

## Roadmap 🗺️

- [ ] Smart contract integration (deposit/withdrawal contracts)
- [ ] Token swaps
- [ ] Liquidity pools
- [ ] Yield farming
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Multi-chain support
- [ ] DAO governance

---

Built with ❤️ by the Base DeFi Bank Team

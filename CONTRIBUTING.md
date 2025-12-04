# Contributing to DeFi Bank

Thank you for considering contributing to DeFi Bank! This document provides guidelines for contributing to the project.

## Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/cryptonique0/banking-evm.git
cd banking-evm
```

2. **Install dependencies**
```bash
npm install --legacy-peer-deps
```

3. **Set up environment variables**
Copy `.env.example` files and fill in your values:
```bash
cp apps/web/.env.example apps/web/.env.local
cp packages/contracts/.env.example packages/contracts/.env
```

4. **Run development server**
```bash
npm run dev
```

## Project Structure

```
banking-evm/
├── apps/
│   └── web/                # Next.js frontend
│       ├── app/            # App router pages
│       ├── components/     # React components
│       ├── lib/            # Utilities and contract ABIs
│       └── providers/      # Web3 providers
├── packages/
│   └── contracts/          # Smart contracts
│       ├── contracts/      # Solidity source files
│       ├── scripts/        # Deployment scripts
│       ├── test/           # Contract tests
│       └── tasks/          # Hardhat tasks
└── .github/
    └── workflows/          # CI/CD pipelines
```

## Smart Contract Development

### Adding a New Contract

1. Create contract in `packages/contracts/contracts/`
2. Add tests in `packages/contracts/test/`
3. Compile: `npm run compile`
4. Test: `npm test`
5. Deploy: `npm run deploy:sepolia`

### Contract Guidelines

- Use Solidity 0.8.24
- Import from OpenZeppelin when possible
- Add ReentrancyGuard to functions with external calls
- Emit events for all state changes
- Write comprehensive tests
- Document complex functions with NatSpec

### Testing

All contracts must have tests covering:
- Successful operations
- Error cases
- Edge cases
- Gas optimization

Run tests:
```bash
cd packages/contracts
npm test
```

## Frontend Development

### Adding a New Page

1. Create page in `apps/web/app/[page-name]/page.tsx`
2. Add route to navigation in `apps/web/app/layout.tsx`
3. Use existing components from `apps/web/components/`
4. Follow TypeScript strict mode

### Component Guidelines

- Use TypeScript with proper typing
- Mark client components with `'use client'`
- Use wagmi hooks for Web3 interactions
- Handle loading and error states
- Make responsive (mobile-first)

### Styling

- Use Tailwind CSS utility classes
- Follow existing color scheme (dark theme)
- Maintain consistent spacing
- Use responsive breakpoints

## Git Workflow

### Branching

- `main` - production-ready code
- `feat/feature-name` - new features
- `fix/bug-name` - bug fixes
- `docs/update-name` - documentation updates

### Commit Messages

Follow conventional commits:
```
feat: add lending protocol
fix: resolve staking reward calculation
docs: update README with new features
test: add tests for DeBankLending
chore: update dependencies
```

### Pull Requests

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Update documentation
6. Submit PR with clear description

## Code Review

All PRs require:
- [ ] Tests passing
- [ ] No linting errors
- [ ] Documentation updated
- [ ] Gas-efficient (for contracts)
- [ ] Mobile-responsive (for UI)

## Testing Guidelines

### Contract Tests
```bash
cd packages/contracts
npm test
```

### Frontend Build
```bash
cd apps/web
npm run build
```

### Linting
```bash
npm run lint
```

## Deployment

### Test Networks

Deploy to testnets first:
```bash
# Base Sepolia
npm run deploy:sepolia

# Celo Alfajores
npm run deploy:celo-testnet
```

### Production

Only deploy after thorough testing:
```bash
# Base Mainnet
npm run deploy:base

# Celo Mainnet
npm run deploy:celo
```

## Security

- Never commit private keys or secrets
- Use `.env` for sensitive data
- Report security issues privately
- Follow OpenZeppelin best practices
- Consider audits for major changes

## Questions?

- Open an issue for bugs or features
- Join discussions for general questions
- Check existing issues before creating new ones

## License

By contributing, you agree your contributions will be licensed under the MIT License.

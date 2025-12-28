# Contributing to Base DeFi Bank

Thank you for your interest in contributing to Base DeFi Bank! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/base-defi-bank.git`
3. Add upstream remote: `git remote add upstream https://github.com/original-owner/base-defi-bank.git`
4. Create a feature branch: `git checkout -b feature/your-feature`

## Development Setup

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your config

# Setup database
npx prisma migrate dev --name init

# Start development server
npm run dev
```

## Making Changes

### Code Style
- Follow existing code conventions
- Use TypeScript for all new code
- Use `'use client'` directive for client components
- Use proper naming conventions (PascalCase for components, camelCase for functions)

### Component Guidelines
- Keep components focused and single-responsibility
- Use proper TypeScript types
- Document complex logic with comments
- Export named exports for better tree-shaking

### Testing Requirements
- Write unit tests for new components and utilities
- Write E2E tests for new features
- Ensure all tests pass: `npm test`
- Maintain >80% code coverage for new code

## Commit Guidelines

Use conventional commits:
```
feat: add wallet connection feature
fix: resolve deposit validation bug
docs: update API documentation
test: add dashboard component tests
chore: update dependencies
```

Format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

## Pull Request Process

1. Update `README.md` if needed
2. Run tests: `npm test`
3. Run linter: `npm run lint`
4. Build: `npm run build`
5. Push to your fork
6. Create PR with descriptive title and description
7. Reference any related issues with `Fixes #123`

### PR Title Format
```
feat: brief description of feature
```

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change

## How to Test
Steps to test the changes

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage
npm test:coverage

# Run E2E tests
npm run cypress:run

# Open Cypress UI
npm run cypress:open
```

## Documentation

- Update relevant docs when adding features
- Keep API documentation up to date
- Add JSDoc comments for complex functions
- Update ROADMAP.md for larger features

## Security

- Never commit API keys or secrets
- Use environment variables for sensitive data
- Report security issues privately to maintainers

## File Structure

When adding new features, maintain this structure:

```
New Feature
├── components/          # React components
├── lib/                 # Utility functions
├── app/api/            # API routes
├── contexts/           # React contexts
├── __tests__/          # Tests
├── cypress/e2e/        # E2E tests
└── types/              # TypeScript types (if needed)
```

## Performance Considerations

- Minimize bundle size
- Use code splitting where appropriate
- Optimize images and assets
- Lazy load components when suitable
- Use React.memo for expensive components

## Accessibility

- Ensure keyboard navigation works
- Use semantic HTML
- Include proper ARIA labels
- Test with screen readers
- Maintain contrast ratios

## Common Tasks

### Adding a New API Endpoint

1. Create route in `app/api/[feature]/route.ts`
2. Add database models to `prisma/schema.prisma` if needed
3. Add request/response types
4. Write tests in `__tests__/api/`
5. Update API documentation in README.md

### Adding a New Component

1. Create in `components/[ComponentName].tsx`
2. Use 'use client' if client-side logic needed
3. Add TypeScript types
4. Write component tests in `__tests__/components/`
5. Add Cypress E2E tests if user-facing

### Adding Dependencies

```bash
# Install package
npm install package-name

# For dev dependencies
npm install --save-dev package-name

# Always run tests to ensure compatibility
npm test
```

## Getting Help

- Check existing issues and discussions
- Read the documentation
- Ask in GitHub discussions
- Contact maintainers for guidance

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors graph

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Happy contributing! 🎉

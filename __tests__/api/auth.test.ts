import { hashPassword, verifyPassword } from '@/lib/auth';

describe('Authentication', () => {
  it('should hash password correctly', async () => {
    const password = 'testPassword123';
    const hashed = await hashPassword(password);
    expect(hashed).not.toBe(password);
  });

  it('should verify correct password', async () => {
    const password = 'testPassword123';
    const hashed = await hashPassword(password);
    const isValid = await verifyPassword(password, hashed);
    expect(isValid).toBe(true);
  });

  it('should reject incorrect password', async () => {
    const password = 'testPassword123';
    const hashed = await hashPassword(password);
    const isValid = await verifyPassword('wrongPassword', hashed);
    expect(isValid).toBe(false);
  });
});

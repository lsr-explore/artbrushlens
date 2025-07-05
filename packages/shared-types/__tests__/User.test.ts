import { describe, it, expect } from 'vitest';
import type { User } from '../src/types/User';

describe('User', () => {
  it('should create a valid user with required fields', () => {
    const user: User = {
      id: '1',
      email: 'user@example.com',
      role: 'user',
    };

    expect(user.id).toBe('1');
    expect(user.email).toBe('user@example.com');
    expect(user.role).toBe('user');
  });

  it('should create a valid user with optional name field', () => {
    const user: User = {
      id: '2',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
    };

    expect(user.id).toBe('2');
    expect(user.email).toBe('admin@example.com');
    expect(user.name).toBe('Admin User');
    expect(user.role).toBe('admin');
  });

  it('should allow undefined name field', () => {
    const user: User = {
      id: '3',
      email: 'test@example.com',
      name: undefined,
      role: 'user',
    };

    expect(user.id).toBe('3');
    expect(user.email).toBe('test@example.com');
    expect(user.name).toBeUndefined();
    expect(user.role).toBe('user');
  });

  it('should validate user role types', () => {
    const adminUser: User = {
      id: '4',
      email: 'admin@example.com',
      role: 'admin',
    };

    const regularUser: User = {
      id: '5',
      email: 'user@example.com',
      role: 'user',
    };

    expect(adminUser.role).toBe('admin');
    expect(regularUser.role).toBe('user');
  });

  it('should validate user structure with type guard', () => {
    function isUser(obj: unknown): obj is User {
      return (
        typeof obj === 'object' &&
        obj !== null &&
        'id' in obj &&
        'email' in obj &&
        'role' in obj &&
        typeof (obj as any).id === 'string' &&
        typeof (obj as any).email === 'string' &&
        ((obj as any).role === 'admin' || (obj as any).role === 'user')
      );
    }

    const validUser = {
      id: '6',
      email: 'valid@example.com',
      role: 'user',
    };

    const invalidUser = {
      id: 123,
      email: 'invalid@example.com',
      role: 'invalid_role',
    };

    expect(isUser(validUser)).toBe(true);
    expect(isUser(invalidUser)).toBe(false);
    expect(isUser(null)).toBe(false);
    expect(isUser(undefined)).toBe(false);
  });

  it('should handle different email formats', () => {
    const users: User[] = [
      {
        id: '7',
        email: 'simple@example.com',
        role: 'user',
      },
      {
        id: '8',
        email: 'test.user+tag@example.co.uk',
        role: 'admin',
      },
      {
        id: '9',
        email: 'user123@subdomain.example.org',
        role: 'user',
      },
    ];

    expect(users[0].email).toBe('simple@example.com');
    expect(users[1].email).toBe('test.user+tag@example.co.uk');
    expect(users[2].email).toBe('user123@subdomain.example.org');
  });

  it('should create users with both admin and user roles', () => {
    const adminUser: User = {
      id: '10',
      email: 'admin@company.com',
      name: 'System Admin',
      role: 'admin',
    };

    const regularUser: User = {
      id: '11',
      email: 'user@company.com',
      name: 'Regular User',
      role: 'user',
    };

    expect(adminUser.role).toBe('admin');
    expect(regularUser.role).toBe('user');
  });
});

import { validateEmail, validatePassword } from '@/utils/validation';

describe('Validation Utils', () => {
  describe('validateEmail', () => {
    it('returns true for a valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    it('returns false for an invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@.com')).toBe(false);
      expect(validateEmail('test@com')).toBe(false);
      expect(validateEmail('test@com.')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('returns true for a valid password', () => {
      expect(validatePassword('password1')).toBe(true);
      expect(validatePassword('abc12345')).toBe(true);
    });

    it('returns false for a password shorter than 8 characters', () => {
      expect(validatePassword('pass1')).toBe(false);
      expect(validatePassword('abc123')).toBe(false);
    });

    it('returns false for a password without numbers', () => {
      expect(validatePassword('password')).toBe(false);
      expect(validatePassword('abcdefgh')).toBe(false);
    });

    it('returns false for a password without letters', () => {
      expect(validatePassword('12345678')).toBe(false);
      expect(validatePassword('87654321')).toBe(false);
    });

    it('returns false for a password with special characters', () => {
      expect(validatePassword('password!')).toBe(false);
      expect(validatePassword('abc12345@')).toBe(false);
    });
  });
});

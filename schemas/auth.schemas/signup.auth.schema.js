const { z } = require('zod');

const signupAuthSchema = z.object({
  first_name: z.string({
    error: (issue) => {
      if (issue.input === undefined) return 'First name is required.';
      if (issue.code === 'invalid_type') return 'First name must be a string.';
      return 'First name must be at least 2 characters and only contain letters.';
    }
  })
    .min(2, { error: 'First name must be at least 2 characters.' })
    .regex(/^[A-Za-z]+$/, { error: 'First name must contain only letters.' }),
  last_name: z.string({
    error: (issue) => {
      if (issue.code === 'invalid_type') return 'Last name must be a string.';
      return 'Last name must be at least 2 characters and only contain letters and spaces.';
    }
  })
    .min(2, { error: 'Last name must be at least 2 characters.' })
    .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, { error: 'Last name must contain only letters and single spaces between names.' })
    .optional(),
  mobile: z.string({
    error: (issue) => {
      if (issue.input === undefined) return 'Mobile number is required.';
      if (issue.code === 'invalid_type') return 'Mobile number must be a string.';
      return 'Mobile number must be valid.';
    }
  })
    .min(10, { error: 'Mobile number must be at least 10 digits.' })
    .regex(/^[6-9]\d{9}$/, { error: 'Mobile number must start with 6, 7, 8, or 9 and be exactly 10 digits.' }),
  otp: z.string({
    error: (issue) => {
      if (issue.input === undefined) return 'OTP is required.';
      if (issue.code === 'invalid_type') return 'OTP must be a string.';
      return 'OTP must be a 6-digit number.';
    }
  })
    .length(6, { error: 'OTP must be exactly 6 digits.' })
    .regex(/^\d{6}$/, { error: 'OTP must be a 6-digit number.' }),
  email: z.email({
    error: (issue) => {
      if (issue.input === undefined) return 'Email is required.';
      if (issue.code === 'invalid_type') return 'Email must be a string.';
      return 'Valid email is required.';
    }
  }),
  password: z.string({
    error: (issue) => {
      if (issue.input === undefined) return 'Password is required.';
      if (issue.code === 'invalid_type') return 'Password must be a string.';
      return 'Password must be at least 8 characters and contain 1 uppercase, 1 lowercase, 1 number, and 1 special character.';
    }
  })
    .min(8, { error: 'Password must be at least 8 characters.' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
      error: 'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.'
    })
});

module.exports = signupAuthSchema;

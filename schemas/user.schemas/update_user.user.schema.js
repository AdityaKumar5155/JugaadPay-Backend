const { z } = require('zod');

const updateUserSchema = z.object({
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
});

module.exports = updateUserSchema;

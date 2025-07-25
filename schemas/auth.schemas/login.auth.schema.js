const { z } = require('zod');

const loginAuthSchema = z.object({
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
      return 'Password is required.';
    }
  })
});

module.exports = loginAuthSchema;

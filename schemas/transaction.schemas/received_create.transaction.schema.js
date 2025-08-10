const { z } = require('zod');

const receivedCreateTransactionSchema = z.object({
  amount: z.coerce.number({
    error: (issue) => {
      if (issue.input === undefined) return 'Amount is required.';
      if (issue.code === 'invalid_type') return 'Amount must be a number.';
      return 'Amount must be positive.';
    }
  }).min(0.01, { error: 'Amount must be positive.' }),
  datetime: z.string({
    error: (issue) => {
      if (issue.input === undefined) return 'Datetime is required.';
      if (issue.code === 'invalid_type') return 'Datetime must be a string.';
      return 'Datetime must be a valid date.';
    }
  }).refine(val => !isNaN(Date.parse(val)), { error: 'Datetime must be a valid date.' }),
  description: z.string({
    error: (issue) => {
      if (issue.code === 'invalid_type') return 'Description must be a string.';
      return 'Description too long.';
    }
  }).max(255, { error: 'Description too long.' }).optional(),
  payer_id: z.number({
    error: (issue) => {
      if (issue.input === undefined) return 'Payer ID is required.';
      if (issue.code === 'invalid_type') return 'Payer ID must be a number.';
      return 'Payer ID is required.';
    }
  }),
});

module.exports = receivedCreateTransactionSchema;

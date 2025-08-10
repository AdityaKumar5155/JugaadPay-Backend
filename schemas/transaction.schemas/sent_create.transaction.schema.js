const { z } = require('zod');

const payeeSchema = z.object({
  payee_id: z.number({
    error: (issue) => {
      if (issue.input === undefined) return 'Payee ID is required.';
      if (issue.code === 'invalid_type') return 'Payee ID must be a number.';
      return 'Payee ID is required.';
    }
  }),
  amount: z.coerce.number({
    error: (issue) => {
      if (issue.input === undefined) return 'Amount is required.';
      if (issue.code === 'invalid_type') return 'Amount must be a number.';
      return 'Amount cannot be zero.';
    }
  }).min(0.01, { error: 'Amount must be positive.' })
});

const sentCreateTransactionSchema = z.object({
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
  payees: z.array(payeeSchema, {
    error: (issue) => {
      if (issue.input === undefined) return 'Payees are required.';
      if (issue.code === 'invalid_type') return 'Payees must be an array.';
      return 'At least one payee is required.';
    }
  }).min(1, { error: 'At least one payee is required.' }),
});

module.exports = sentCreateTransactionSchema;
